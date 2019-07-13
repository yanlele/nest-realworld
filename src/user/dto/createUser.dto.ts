/**
 * create by yanle
 * create time 2019/7/13 4:49 PM
 */

import {IsEmail, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
