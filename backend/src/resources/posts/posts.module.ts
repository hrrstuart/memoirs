import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), forwardRef(() => UserModule)],
  providers: [PostsResolver, PostsService],
  exports: [PostsService]
})
export class PostsModule {}
