/**
 * create by yanle
 * create time 2019/7/13 5:15 PM
 */
import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {UserController} from "./user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [],
  controllers: [UserController],
})
export class UserModule {
}
