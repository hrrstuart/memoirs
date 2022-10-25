import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './typeorm';
import { UsersModule } from './users/users.module';

config({ path: join(process.cwd(), 'src/.env') })

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    database: 'atorus_redo',
    port: 3306,
    username: 'root',
    password: process.env.MYSQL_PASSWORD,
    synchronize: true,
    entities
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
