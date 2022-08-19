import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';

// Modules
import { UserModule } from 'src/resources/user_relations/user/user.module';
import { PostsModule } from 'src/resources/user_created/posts/posts.module';
import { AlbumMemberModule } from 'src/resources/user_relations/album_member/album-member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => UserModule),
    forwardRef(() => PostsModule),
    forwardRef(() => AlbumMemberModule),
  ],
  providers: [AlbumsResolver, AlbumsService],
  exports: [AlbumsService]
})
export class AlbumsModule {}
