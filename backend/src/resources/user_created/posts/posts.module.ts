import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

// Modules
import { UserModule } from 'src/resources/user_relations/user/user.module';
import { CommentsModule } from '../comments/comments.module';
import { PostLikesModule } from '../post_likes/postlikes.module';
import { ReferencedPostsModule } from '../referenced_posts/referenced_posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => UserModule),
    forwardRef(() => CommentsModule),
    forwardRef(() => PostLikesModule),
    forwardRef(() => ReferencedPostsModule)
  ],
  providers: [PostsResolver, PostsService],
  exports: [PostsService]
})
export class PostsModule {}
