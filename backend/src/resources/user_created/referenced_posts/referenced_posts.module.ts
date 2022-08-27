import { forwardRef, Module } from '@nestjs/common';
import { ReferencedPostsService } from './referenced_posts.service';
import { ReferencedPostsResolver } from './referenced_posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReferencedPost } from './referenced_post.entity';
import { PostsModule } from '../posts/posts.module';
import { AlbumsModule } from '../albums/albums.module';
import { UserModule } from 'src/resources/user_relations/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReferencedPost]),
    forwardRef(() => PostsModule),
    forwardRef(() => AlbumsModule),
    forwardRef(() => UserModule)
  ],
  providers: [ReferencedPostsResolver, ReferencedPostsService],
  exports: [ReferencedPostsService]
})
export class ReferencedPostsModule {}
