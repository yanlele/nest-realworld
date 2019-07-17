/**
 * create by yanle
 * create time 2019/7/17 10:24 PM
 */
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UserEntity} from './user.entity';

export class UserService {
  constructor(@InjectRepository(UserEntity)
              private readonly userRepository: Repository<UserEntity>) {
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
