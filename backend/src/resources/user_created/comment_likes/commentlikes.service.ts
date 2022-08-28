import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from 'src/resources/user_relations/user/user.service';
import { CreateCommentLikeInput } from './dto/create-like.input';
import { CommentsService } from '../comments/comments.service';

// Entities
import { CommentLike } from './commentlike.entity';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectRepository(CommentLike) private commentLikesRepository: Repository<CommentLike>,
    @Inject(forwardRef(() => UserService)) private usersService: UserService,
    @Inject(forwardRef(() => CommentsService)) private commentsService: CommentsService,
  ) {}

  create(userId: string, createLikeInput: CreateCommentLikeInput) {
    const newLike = this.commentLikesRepository.create({
      userId,
      ...createLikeInput
    });

    return this.commentLikesRepository.save(newLike);
  }

  findAll() {
    return this.commentLikesRepository.find();
  }

  findOne(id: string) {
    return this.commentLikesRepository.findOneByOrFail({ id });
  }

  getCommentLikes(commentId: string) {
    return this.commentLikesRepository.findBy({ commentId });
  }

  findAllByOwner(userId: string) {
    return this.commentLikesRepository.findBy({ userId });
  }

  getOwner(user_id: string) {
    return this.usersService.findOne("id", user_id);
  }

  getComment(commentId: string) {
    return this.commentsService.findOne(commentId);
  }
}
