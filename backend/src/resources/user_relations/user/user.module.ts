import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';

// Modules
import { PostsModule } from 'src/resources/user_created/posts/posts.module';
import { AlbumsModule } from 'src/resources/user_created/albums/albums.module';
import { CommentsModule } from '../../user_created/comments/comments.module';
import { PostLikesModule } from '../../user_created/post_likes/postlikes.module';
import { FollowModule } from '../user_follow/user_follow.module';
import { AlbumMemberModule } from '../album_member/album-member.module';
import { ReferencedPostsModule } from 'src/resources/user_created/referenced_posts/referenced_posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AlbumsModule),
    forwardRef(() => AlbumMemberModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => FollowModule),
    forwardRef(() => PostLikesModule),
    forwardRef(() => PostsModule),
    forwardRef(() => ReferencedPostsModule)
  ],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('createPost')
  }
}
