import { forwardRef, Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesResolver } from './likes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { UserModule } from 'src/resources/user/user.module';
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
