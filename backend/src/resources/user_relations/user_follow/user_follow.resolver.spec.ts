import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowResolver } from './user_follow.resolver';
import { UserFollowService } from './user_follow.service';

describe('FollowResolver', () => {
  let resolver: UserFollowResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollowResolver, UserFollowService],
    }).compile();

    resolver = module.get<UserFollowResolver>(UserFollowResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
