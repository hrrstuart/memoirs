import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/post.entity';
import { PostsService } from '../posts/posts.service';
import { CreateReferencedPostInput } from './dto/create-referenced_post.input';
import { ReferencedPost } from './referenced_post.entity';

@Injectable()
export class ReferencedPostsService {
  constructor(
    @InjectRepository(ReferencedPost) private referencedPostRepository: Repository<ReferencedPost>,
    @Inject(forwardRef(() => PostsService)) private postsService: PostsService
  ) {}

  create(createReferencedPostInput: CreateReferencedPostInput, userId: string) {
    const newReferencedPost = this.referencedPostRepository.create({
      ...createReferencedPostInput
    });

    return this.referencedPostRepository.save(newReferencedPost);
  }

  findAllByAlbum(albumId: string): Promise<ReferencedPost[]> {
    return this.referencedPostRepository.findBy({ albumId: albumId });
  }

  findAllByPost(postId: string): Promise<ReferencedPost[]> {
    return this.referencedPostRepository.findBy({ postId });
  }

  getPost(postId: string): Promise<Post> {
    return this.postsService.findOne(postId);
  }
}
