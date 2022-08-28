import { Test, TestingModule } from '@nestjs/testing';
import { AlbumFollowService } from './album_follow.service';

describe('FollowService', () => {
  let service: AlbumFollowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumFollowService],
    }).compile();

    service = module.get<AlbumFollowService>(AlbumFollowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
