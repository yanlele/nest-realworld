/**
 * create by yanle
 * create time 2019/7/13 5:16 PM
 */
import {Controller, Get} from '@nestjs/common';

@Controller('user')
export class UserController {

  @Get('test')
  test() {
    return {
      message: 'just test',
      success: true,
      data: {}
    }
  }
}

