import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';

// Modules
import { UserModule } from 'src/resources/user_relations/user/user.module';
import { PostsModule } from 'src/resources/user_created/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Album]),
    forwardRef(() => UserModule),
    forwardRef(() => PostsModule)
  ],
  providers: [AlbumsResolver, AlbumsService],
  exports: [AlbumsService]
})
export class AlbumsModule {}
