import { Module } from '@nestjs/common';
import { User } from 'src/typeorm';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { UploadService } from 'src/utils/upload.service';
import { FilesService } from 'src/utils/file.service';
import { AlbumsService } from '../albums/services/albums/albums.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UploadService, FilesService, AlbumsService],
})
export class UsersModule {}
