import { Test, TestingModule } from '@nestjs/testing';
import { FollowResolver } from './album_follow.resolver';
import { AlbumFollowService } from './album_follow.service';

describe('FollowResolver', () => {
  let resolver: FollowResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowResolver, AlbumFollowService],
    }).compile();

    resolver = module.get<FollowResolver>(FollowResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
