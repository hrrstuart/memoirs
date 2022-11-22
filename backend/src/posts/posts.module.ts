import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/typeorm';
import { FilesService } from 'src/utils/file.service';
import { UploadService } from 'src/utils/upload.service';
import { PostsController } from './controllers/posts/posts.controller';
import { PostsService } from './services/posts/posts.service';

@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostsController],
    providers: [PostsService, UploadService, FilesService]
})
export class PostsModule {}
