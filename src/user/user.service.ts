/**
 * create by yanle
 * create time 2019/7/17 10:24 PM
 */
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, getRepository, Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {CreateUserDto, LoginUserDto, UpdateUserDto} from './dto';
import * as crypto from 'crypto';
import {UserRo} from './user.interface';
import {validate} from 'class-validator';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity)
              private readonly userRepository: Repository<UserEntity>) {
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(loginUser: LoginUserDto): Promise<UserEntity> {
    const findOneOptions = {
      email: loginUser.email,
      password: crypto.createHmac('sha256', loginUser.password).digest('hex'),
    };
    return await this.userRepository.findOne(findOneOptions);
  }

  async create(createUser: CreateUserDto): Promise<UserRo> {
    const {username, email, password} = createUser;
    const qb = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.username = :username', {username})
      .orWhere('user.email = :email', {email});

    const user = await qb.getOne();
    if (user) {
      const errors = {username: '用户名或者邮箱不能有重复'};
      throw new HttpException({message: '输入错误', errors}, HttpStatus.BAD_REQUEST);
    }

    const newUser = new UserEntity();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      throw new HttpException({
        message: 'Input data validation failed',
        errors: this.buildError(errors),
      }, HttpStatus.BAD_REQUEST);
    } else {
      const savedUser = await this.userRepository.save(newUser);
      return this.buildUserRO(savedUser);
    }
  }

  async update(id: number, user: UpdateUserDto): Promise<UserEntity> {
    const toUpdate = await this.userRepository.findOne(id);

    delete toUpdate.password;
    // todo remove favorites

    const updated = Object.assign(toUpdate, user);
    return await this.userRepository.save(updated);
  }

  async delete(email: string): Promise<DeleteResult> {
    return await this.userRepository.delete({email});
  }

  private buildError(errors) {
    const result = {};
    errors.forEach(el => {
      const prop = el.property;
      Object.entries(el.constraints).forEach(constraint => {
        result[prop + constraint[0]] = `${constraint[1]}`;
      });
    });
    return result;
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      username: user.username,
      email: user.email,
      bio: user.bio,
      image: user.image,
    };

    return {user: userRO};
  }
}
