import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/resources/user/user.entity';
import { UserService } from 'src/resources/user/user.service';
import { Repository } from 'typeorm';
import { Comment } from '../comments/comment.entity';
import { CommentsService } from '../comments/comments.service';
import { Like } from '../likes/like.entity';
import { LikesService } from '../likes/likes.service';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => CommentsService)) private commentsService: CommentsService,
    @Inject(forwardRef(() => LikesService)) private likesService: LikesService,
  ) {}

  create(createPostInput: CreatePostInput) {
    const newPost = this.postsRepository.create(createPostInput)

    return this.postsRepository.save(newPost);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findAllByAlbum(album_id: string) {
    return this.postsRepository.findBy({ album_id })
  }

  findAllByOwner(user_id: string) {
    return this.postsRepository.findBy({ userId: user_id })
  }

  findOne(id: string): Promise<Post> {
    return this.postsRepository.findOneByOrFail({ id });
  }

  getOwner(ownerId: string): Promise<User> {
    return this.userService.findOne("id", ownerId)
  }

  getComments(post_id: string): Promise<Comment[]> {
    return this.commentsService.findAllByPost(post_id);
  }

  getLikes(post_id: string): Promise<Like[]> {
    return this.likesService.findParentLikes(post_id, "POST");
  }
}
