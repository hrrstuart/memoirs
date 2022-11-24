import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity, User } from 'src/typeorm';
import { AuthController } from './controllers/auth/auth.controller';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

import { AuthService } from './services/auth/auth.service';
import { FilesService } from 'src/utils/file.service';
import { UploadService } from 'src/utils/upload.service';
import { UsersService } from 'src/resources/users/services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, SessionEntity])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, UploadService, FilesService, SessionSerializer]
})
export class AuthModule {}
