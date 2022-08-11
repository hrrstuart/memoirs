import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';

// Modules
import { PostsModule } from 'src/resources/user_created/posts/posts.module';
import { AlbumsModule } from 'src/resources/user_created/albums/albums.module';
import { CommentsModule } from '../user_created/comments/comments.module';
import { LikesModule } from '../user_created/likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => PostsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => LikesModule),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('createPost')
  }
}
