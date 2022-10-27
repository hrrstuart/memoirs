import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

config({ path: join(process.cwd(), 'src/.env') })

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      database: 'atorus_redo',
      port: 3306,
      username: 'root',
      password: process.env.MYSQL_PASSWORD,
      synchronize: true,
      entities
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
