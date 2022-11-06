import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/posts/dtos/CreatePost.dto';
import { Post, User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

    getPosts() {
        return this.postRepository.find();
    }

    async createPost(createPost: CreatePostDto, owner: User): Promise<Post> {
        const newPost = await this.postRepository.create({
            owner,
            album: { id: createPost.albumId },
            ...createPost
        });
        return this.postRepository.save(newPost);
    }
}
