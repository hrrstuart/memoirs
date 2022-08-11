import { Repository } from 'typeorm';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";

import { CreateUserInput } from './dto/create-user.input';

// Services
import { AlbumsService } from 'src/resources/user_created/albums/albums.service';
import { CommentsService } from '../user_created/comments/comments.service';
import { LikesService } from '../user_created/likes/likes.service';
import { PostsService } from 'src/resources/user_created/posts/posts.service';

// Entities
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Comment } from '../user_created/comments/comment.entity';
import { Like } from '../user_created/likes/like.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @Inject(forwardRef(() => PostsService)) private postService: PostsService,
        @Inject(forwardRef(() => AlbumsService)) private albumsService: AlbumsService,
        @Inject(forwardRef(() => CommentsService)) private commentsService: CommentsService,
        @Inject(forwardRef(() => LikesService)) private likesService: LikesService,
    ) {}

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(createUserInput.password, salt);
        
        const newUser = this.userRepository.create({
            ...createUserInput,
            password: hash
        });

        return this.userRepository.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(searchType: string, searchQuery: string): Promise<User> {
        return searchType === "id" ?
            this.userRepository.findOneByOrFail({ id: searchQuery }) :
            this.userRepository.findOneByOrFail({ username: searchQuery });
    }

    getPosts(userId: string): Promise<Post[]> {
        return this.postService.findAllByOwner(userId);
    }

    getAlbums(user_id: string): Promise<Album[]> {
        return this.albumsService.findAllByOwner(user_id);
    }

    getComments(user_id: string): Promise<Comment[]> {
        return this.commentsService.findAllByOwner(user_id);
    }

    getLikes(user_id: string): Promise<Like[]> {
        return this.likesService.findAllByOwner(user_id);
    }
}
