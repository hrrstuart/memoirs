import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/resources/user/user.service';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @Inject(forwardRef(() => UserService)) private userService: UserService
    ) {}

  create(createCommentInput: CreateCommentInput) {
    const newComment = this.commentsRepository.create(createCommentInput);

    return this.commentsRepository.save(newComment);
  }

  findAll() {
    return this.commentsRepository.find();
  }

  findOne(id: string) {
    return this.commentsRepository.findOneByOrFail({ id })
  }

  findAllByOwner(user_id: string) {
    return this.commentsRepository.findBy({ user_id });
  }

  findAllByPost(post_id: string) {
    return this.commentsRepository.findBy({ post_id });
  }

  getOwner(user_id: string) {
    return this.userService.findOne(user_id);
  }
}
