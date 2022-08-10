import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PostsModule } from 'src/resources/user_created/posts/posts.module';
import { AlbumsModule } from 'src/resources/user_created/albums/albums.module';
import { CommentsModule } from '../user_created/comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => PostsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => CommentsModule),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule {}