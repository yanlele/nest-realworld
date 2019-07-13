/**
 * create by yanle
 * create time 2019/7/13 5:09 PM
 */
import {IsNotEmpty} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
