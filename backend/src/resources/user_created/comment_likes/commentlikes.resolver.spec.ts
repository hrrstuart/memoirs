import { Test, TestingModule } from '@nestjs/testing';
import { CommentLikesResolver } from './commentlikes.resolver';
import { CommentLikesService } from './commentlikes.service';

describe('LikesResolver', () => {
  let resolver: CommentLikesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentLikesResolver, CommentLikesService],
    }).compile();

    resolver = module.get<CommentLikesResolver>(CommentLikesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
