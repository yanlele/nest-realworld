/**
 * create by yanle
 * create time 2019/7/17 10:24 PM
 */
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {CreateUserDto, LoginUserDto} from './dto';
import * as crypto from 'crypto';

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
}
