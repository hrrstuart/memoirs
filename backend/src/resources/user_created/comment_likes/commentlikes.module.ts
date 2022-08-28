import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentLikesService } from './commentlikes.service';
import { CommentLikesResolver } from './commentlikes.resolver';
import { CommentLike } from './commentlike.entity';

// Modules
import { UserModule } from 'src/resources/user_relations/user/user.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentLike]),
    forwardRef(() => UserModule),
    forwardRef(() => CommentsModule)
  ],
  providers: [CommentLikesResolver, CommentLikesService],
  exports: [CommentLikesService]
})
export class CommentLikesModule {}
