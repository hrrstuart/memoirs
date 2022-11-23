import { Module } from '@nestjs/common';
import { User } from 'src/typeorm';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}