import { Test, TestingModule } from '@nestjs/testing';
import { AlbumMemberResolver } from './album-member.resolver';

describe('AlbumMemberResolver', () => {
  let resolver: AlbumMemberResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumMemberResolver],
    }).compile();

    resolver = module.get<AlbumMemberResolver>(AlbumMemberResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
