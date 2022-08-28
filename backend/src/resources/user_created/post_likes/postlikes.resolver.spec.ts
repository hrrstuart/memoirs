import { Test, TestingModule } from '@nestjs/testing';
import { PostLikesResolver } from './postlikes.resolver';
import { PostLikesService } from './postlikes.service';

describe('LikesResolver', () => {
  let resolver: PostLikesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostLikesResolver, PostLikesService],
    }).compile();

    resolver = module.get<PostLikesResolver>(PostLikesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
