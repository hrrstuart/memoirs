import { Inject, Injectable } from '@nestjs/common';
import { generateString, InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/resources/posts/dtos/CreatePost.dto';
import { Post, User } from 'src/typeorm';
import { UploadService } from 'src/utils/upload.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post) private readonly postRepository: Repository<Post>,
        @Inject(UploadService) private readonly uploadService: UploadService
    ) {}

    getPosts() {
        return this.postRepository.find();
    }

    async getPost(id: string) {
        return {
            data: await this.postRepository.findBy({ id }),
            body: await this.uploadService.getPost(id)
        }
    }

    async createPost(createPost: CreatePostDto, owner: User, file: Express.Multer.File): Promise<Post> {    
        const newPost = this.postRepository.create({
            id: generateString(),
            owner,
            album: { id: createPost.albumId },
            ...createPost
        });
        const res = await this.uploadService.addPost(file, newPost.id);
    
        newPost.image_url = res.Location;

        return this.postRepository.save(newPost);
    }
}
