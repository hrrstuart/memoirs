import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { Like } from './like.entity';

// Modules
import { UserModule } from 'src/resources/user_relations/user/user.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like]),
    forwardRef(() => UserModule),
    forwardRef(() => PostsModule)
  ],
  providers: [LikesResolver, LikesService],
  exports: [LikesService]
})
export class LikesModule {}
