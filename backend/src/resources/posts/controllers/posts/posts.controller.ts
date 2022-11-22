import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/resources/auth/utils/LocalGuard';
import { CreatePostDto } from 'src/resources/posts/dtos/CreatePost.dto';
import { PostsService } from 'src/resources/posts/services/posts/posts.service';
import { User, Post as PostEntity } from 'src/typeorm';
import { AuthUser } from 'src/utils/decorators';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get('')
    getPosts() {
        return this.postsService.getPosts();
    }

    @Get('/id/:id')
    async getPost(@Param('id') id: string) {
        return this.postsService.getPost(id);
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
