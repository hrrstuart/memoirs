import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostLikesService } from './postlikes.service';
import { PostLikesResolver } from './postlikes.resolver';
import { PostLike } from './postlike.entity';

// Modules
import { UserModule } from 'src/resources/user_relations/user/user.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostLike]),
    forwardRef(() => UserModule),
    forwardRef(() => PostsModule)
  ],
  providers: [PostLikesResolver, PostLikesService],
  exports: [PostLikesService]
})
export class PostLikesModule {}
