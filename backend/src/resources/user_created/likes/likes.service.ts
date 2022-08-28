import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from 'src/resources/user_relations/user/user.service';
import { PostsService } from '../posts/posts.service';
import { CreateLikeInput } from './dto/create-like.input';

// Entities
import { Like } from './like.entity';
import { LikeType } from './likes.enum';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likesRepository: Repository<Like>,
    @Inject(forwardRef(() => UserService)) private usersService: UserService,
    @Inject(forwardRef(() => PostsService)) private postsService: PostsService,
  ) {}

  create(userId: string, createLikeInput: CreateLikeInput) {
    const newLike = this.likesRepository.create({
      userId,
      ...createLikeInput
    });

    return this.likesRepository.save(newLike);
  }

  findAll() {
    return this.likesRepository.find();
  }

  findOne(id: string) {
    return this.likesRepository.findOneByOrFail({ id });
  }

  findParentLikes(parentId: string, parentType: LikeType) {
    return this.likesRepository.findBy({ parentId, parentType });
  }

  findAllByOwner(userId: string) {
    return this.likesRepository.findBy({ userId });
  }

  getOwner(user_id: string) {
    return this.usersService.findOne("id", user_id);
  }

  getPost(post_id: string) {
    return this.postsService.findOne(post_id);
  }
}
