import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { UserModule } from 'src/resources/user/user.module';
import { PostsModule } from 'src/resources/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => UserModule),
    forwardRef(() => PostsModule)
  ],
  providers: [AlbumsResolver, AlbumsService],
  exports: [AlbumsService]
})
export class AlbumsModule {}
