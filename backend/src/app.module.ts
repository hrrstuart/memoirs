import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './typeorm';
import { UsersModule } from './resources/users/users.module';
import { AuthModule } from './resources/auth/auth.module';
import { AlbumsModule } from './resources/albums/albums.module';
import { PostsModule } from './resources/posts/posts.module';
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
    PassportModule.register({
      session: true
    }),
    AuthModule,
    UsersModule,
    AlbumsModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
