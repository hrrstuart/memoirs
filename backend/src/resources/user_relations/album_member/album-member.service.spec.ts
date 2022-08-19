import { Test, TestingModule } from '@nestjs/testing';
import { AlbumMemberService } from './album-member.service';

describe('AlbumMemberService', () => {
  let service: AlbumMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumMemberService],
    }).compile();

    service = module.get<AlbumMemberService>(AlbumMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
