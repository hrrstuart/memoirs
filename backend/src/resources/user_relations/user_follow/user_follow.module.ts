import { forwardRef, Module } from '@nestjs/common';
import { UserFollowService } from './user_follow.service';
import { UserFollowResolver } from './user_follow.resolver';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFollow } from './user_follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFollow]),
    forwardRef(() => UserModule),
  ],
  providers: [UserFollowResolver, UserFollowService],
  exports: [UserFollowService]
})
export class FollowModule {}
