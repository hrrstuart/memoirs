import { Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { PostsService } from 'src/resources/user_created/posts/posts.service';
import { AlbumsService } from 'src/resources/user_created/albums/albums.service';
import { Album } from 'src/resources/user_created/albums/album.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @Inject(forwardRef(() => PostsService)) private postService: PostsService,
        @Inject(forwardRef(() => AlbumsService)) private albumsService: AlbumsService
    ) {}

    createUser(createUserInput: CreateUserInput): Promise<User> {
        const newUser = this.userRepository.create(createUserInput);

        return this.userRepository.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    getPosts(userId: string): Promise<Post[]> {
        return this.postService.findAllByOwner(userId);
    }

    getAlbums(user_id: string): Promise<Album[]> {
        return this.albumsService.findAllByOwner(user_id);
    }
}
