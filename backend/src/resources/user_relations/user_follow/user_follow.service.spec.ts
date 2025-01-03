import { Test, TestingModule } from '@nestjs/testing';
import { UserFollowService } from './user_follow.service';

describe('FollowService', () => {
  let service: UserFollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFollowService],
    }).compile();

    service = module.get<UserFollowService>(UserFollowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
