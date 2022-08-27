import { Test, TestingModule } from '@nestjs/testing';
import { ReferencedPostsResolver } from './referenced_posts.resolver';
import { ReferencedPostsService } from './referenced_posts.service';

describe('ReferencedPostsResolver', () => {
  let resolver: ReferencedPostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferencedPostsResolver, ReferencedPostsService],
    }).compile();

    resolver = module.get<ReferencedPostsResolver>(ReferencedPostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
