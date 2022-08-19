import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumMemberService } from './album-member.service';
import { AlbumMemberResolver } from './album-member.resolver';
import { AlbumMember } from './album-member.entity';

// Modules
import { AlbumsModule } from 'src/resources/user_created/albums/albums.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumMember]),
    forwardRef(() => AlbumsModule),
    forwardRef(() => UserModule)
  ],
  providers: [AlbumMemberService, AlbumMemberResolver],
  exports: [AlbumMemberService]
})
export class AlbumMemberModule {}
