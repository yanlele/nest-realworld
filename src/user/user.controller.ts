/**
 * create by yanle
 * create time 2019/7/13 5:16 PM
 */
import {Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Get('test')
  test() {
    return {
      message: 'just test',
      success: true,
      data: {},
    };
  }
}
