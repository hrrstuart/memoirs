import { Body, ClassSerializerInterceptor, Controller, Get, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { CreatePostDto } from 'src/posts/dtos/CreatePost.dto';
import { PostsService } from 'src/posts/services/posts/posts.service';
import { User, Post as PostEntity } from 'src/typeorm';
import { AuthUser } from 'src/utils/decorators';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get('')
    getPosts() {
        return this.postsService.getPosts();
    }

    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UseInterceptors(FileInterceptor('file'))
    @Post('create')
    // @UsePipes(ValidationPipe)
    async createPost(
        @AuthUser() user: User,
        @Body() createPostDto: CreatePostDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<PostEntity> {
        const newPost = await this.postsService.createPost(createPostDto, user, file);
        return newPost;
    }
}
