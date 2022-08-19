import { forwardRef, Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './follow.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Follow]),
    forwardRef(() => UserModule),
  ],
  providers: [FollowResolver, FollowService],
  exports: [FollowService]
})
export class FollowModule {}
