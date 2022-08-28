import { forwardRef, Module } from '@nestjs/common';
import { AlbumFollowService } from './album_follow.service';
import { FollowResolver } from './album_follow.resolver';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumFollow } from './album_follow.entity';
import { AlbumsModule } from 'src/resources/user_created/albums/albums.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumFollow]),
    forwardRef(() => UserModule),
    forwardRef(() => AlbumsModule)
  ],
  providers: [FollowResolver, AlbumFollowService],
  exports: [AlbumFollowService]
})
export class AlbumFollowModule {}
