import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UserService } from 'src/resources/user_relations/user/user.service';
import { PostsService } from '../posts/posts.service';
import { LikesService } from '../likes/likes.service';
import { LikeType } from '../likes/likes.enum';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => PostsService)) private postsService: PostsService,
    @Inject(forwardRef(() => LikesService)) private likesService: LikesService
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

  getLikes(commentId: string) {
    return this.likesService.findParentLikes(commentId, LikeType.COMMENT);
  }

  getPost(postId: string) {
    return this.postsService.findOne(postId);
  }

  getOwner(user_id: string) {
    return this.userService.findOne("id", user_id);
  }

}
