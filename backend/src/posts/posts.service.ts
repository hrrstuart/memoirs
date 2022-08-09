import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @Inject(forwardRef(() => UserService)) private userService: UserService
  ) {}

  create(createPostInput: CreatePostInput) {
    const newPost = this.postsRepository.create(createPostInput)

    return this.postsRepository.save(newPost);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findAllByOwner(user_id: string) {
    return this.postsRepository.findBy({ userId: user_id })
  }

  findOne(id: string): Promise<Post> {
    return this.postsRepository.findOneByOrFail({ id });
  }

  getOwner(ownerId: string): Promise<User> {
    return this.userService.findOne(ownerId)
  }
}
