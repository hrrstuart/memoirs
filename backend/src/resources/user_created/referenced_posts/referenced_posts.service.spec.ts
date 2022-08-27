import { Test, TestingModule } from '@nestjs/testing';
import { ReferencedPostsService } from './referenced_posts.service';

describe('ReferencedPostsService', () => {
  let service: ReferencedPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferencedPostsService],
    }).compile();

    service = module.get<ReferencedPostsService>(ReferencedPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
