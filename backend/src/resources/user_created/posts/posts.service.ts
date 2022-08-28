import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';

//Services
import { CommentsService } from '../comments/comments.service';
import { PostLikesService } from '../post_likes/postlikes.service';
import { UserService } from 'src/resources/user_relations/user/user.service';

// Entities
import { Comment } from '../comments/comment.entity';
import { PostLike } from '../post_likes/postlike.entity';
import { Post } from './post.entity';
import { User } from 'src/resources/user_relations/user/user.entity';
import { ReferencedPostsService } from '../referenced_posts/referenced_posts.service';
import { ReferencedPost } from '../referenced_posts/referenced_post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    @Inject(forwardRef(() => CommentsService)) private commentsService: CommentsService,
    @Inject(forwardRef(() => PostLikesService)) private likesService: PostLikesService,
    @Inject(forwardRef(() => ReferencedPostsService)) private referencedPostsService: ReferencedPostsService
  ) {}

  create(userID: string, createPostInput: CreatePostInput) {
    const newPost = this.postsRepository.create({
      userId: userID,
      ...createPostInput
    })

    return this.postsRepository.save(newPost);
  }

  createReference(userId: string, albumId: string, postId: string) {
    return this.referencedPostsService.create({ albumId, postId }, userId);
  }

  findAll() {
    return this.postsRepository.find();
  }

  async findOriginalPosts(albumId: string): Promise<Post[]> {
    return this.postsRepository.findBy({ albumId });
  }

  findReferencedPosts(albumId: string): Promise<ReferencedPost[]> {
    return this.referencedPostsService.findAllByAlbum(albumId);
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

  getComments(postId: string): Promise<Comment[]> {
    return this.commentsService.findAllByPost(postId);
  }

  getLikes(postId: string): Promise<PostLike[]> {
    return this.likesService.findParentLikes(postId);
  }

  getReferencedPosts(postId: string): Promise<ReferencedPost[]> {
    return this.referencedPostsService.findAllByPost(postId);
  }
}
