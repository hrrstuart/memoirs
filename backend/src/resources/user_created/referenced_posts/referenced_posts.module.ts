import { forwardRef, Module } from '@nestjs/common';
import { ReferencedPostsService } from './referenced_posts.service';
import { ReferencedPostsResolver } from './referenced_posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencedPost } from './referenced_post.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReferencedPost]),
    forwardRef(() => PostsModule)
  ],
  providers: [ReferencedPostsResolver, ReferencedPostsService],
  exports: [ReferencedPostsService]
})
export class ReferencedPostsModule {}
