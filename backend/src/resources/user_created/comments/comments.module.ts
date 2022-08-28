import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';

// Modules
import { UserModule } from 'src/resources/user_relations/user/user.module';
import { PostsModule } from '../posts/posts.module';
import { PostLikesModule } from '../post_likes/postlikes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    forwardRef(() => UserModule),
    forwardRef(() => PostsModule),
    forwardRef(() => PostLikesModule),
  ],
  providers: [CommentsResolver, CommentsService],
  exports: [CommentsService]
})
export class CommentsModule {}
