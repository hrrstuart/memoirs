import { Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { Post } from 'src/posts/post.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @Inject(forwardRef(() => PostsService)) private postService: PostsService
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
}
