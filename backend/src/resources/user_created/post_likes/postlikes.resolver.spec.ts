import { Test, TestingModule } from '@nestjs/testing';
import { LikesResolver } from './postlikes.resolver';
import { PostLikesService } from './postlikes.service';

describe('LikesResolver', () => {
  let resolver: LikesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikesResolver, PostLikesService],
    }).compile();

    resolver = module.get<LikesResolver>(LikesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
