/**
 * create by yanle
 * create time 2019/7/13 5:18 PM
 */
import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsEmail} from "class-validator";
import * as crypto from 'crypto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex')
  }
}
