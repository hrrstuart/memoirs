import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/resources/user/user.service';
import { Repository } from 'typeorm';
import { PostsService } from '../posts/posts.service';
import { CreateLikeInput, ParentType } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { Like } from './like.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likesRepository: Repository<Like>,
    @Inject(forwardRef(() => UserService)) private usersService: UserService,
    @Inject(forwardRef(() => PostsService)) private postsService: PostsService,
  ) {}

  create(createLikeInput: CreateLikeInput) {
    const newLike = this.likesRepository.create(createLikeInput);

    return this.likesRepository.save(newLike);
  }

  findAll() {
    return this.likesRepository.find();
  }

  findOne(id: string) {
    return this.likesRepository.findOneByOrFail({ id });
  }

  findParentLikes(parent_id: string, parent_type: string) {
    return this.likesRepository.findBy({ parent_id, parent_type })
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
