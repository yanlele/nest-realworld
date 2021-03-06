/**
 * create by yanle
 * create time 2019/7/13 5:16 PM
 */
import {Body, Controller, Get, Post, Put, Query} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto, UpdateUserDto} from './dto';
import {responseSuccessData, StandResponse} from '../utils/standResponse';
import {UserRo} from './user.interface';
import {UserEntity} from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findMe(@Query('email') email: string): Promise<StandResponse<UserRo>> {
    return responseSuccessData(await this.userService.findByEmail(email));
  }

  @Put()
  async update(@Body('id') userId: number, @Body('user') userData: UpdateUserDto): Promise<StandResponse<UserEntity>> {
    return responseSuccessData(await this.userService.update(userId, userData));
  }

  @Post()
  async create(@Body('user') userData: CreateUserDto): Promise<StandResponse<UserRo>> {
    const user = await this.userService.create(userData);
    return responseSuccessData(user);
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
