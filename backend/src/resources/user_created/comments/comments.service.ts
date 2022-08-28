import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UserService } from 'src/resources/user_relations/user/user.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => PostsService)) private postsService: PostsService,
    ) {}

  create(userId: string, createCommentInput: CreateCommentInput) {
    const newComment = this.commentsRepository.create({
      userId,
      ...createCommentInput
    });

    return this.commentsRepository.save(newComment);
  }

  findAll() {
    return this.commentsRepository.find();
  }

  findOne(id: string) {
    return this.commentsRepository.findOneByOrFail({ id })
  }

  findAllByOwner(userId: string) {
    return this.commentsRepository.findBy({ userId });
  }

  findAllByPost(postId: string) {
    return this.commentsRepository.findBy({ postId });
  }

  getOwner(user_id: string) {
    return this.userService.findOne("id", user_id);
  }

  getPost(postId: string) {
    return this.postsService.findOne(postId);
  }
}
