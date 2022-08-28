import { Test, TestingModule } from '@nestjs/testing';
import { PostLikesService } from './postlikes.service';

describe('LikesService', () => {
  let service: PostLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostLikesService],
    }).compile();

    service = module.get<PostLikesService>(PostLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});