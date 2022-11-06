import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
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
    @Post('create')
    @UsePipes(ValidationPipe)
    async createPost(@AuthUser() user: User, @Body() createPostDto: CreatePostDto): Promise<PostEntity> {
        console.log(createPostDto);
        const newPost = await this.postsService.createPost(createPostDto, user);
        return newPost;
    }
}
