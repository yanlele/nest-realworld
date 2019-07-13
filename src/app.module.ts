import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./user/user.module";
import {Connection} from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
  }
}
