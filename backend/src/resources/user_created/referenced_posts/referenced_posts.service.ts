import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../albums/album.entity';
import { AlbumsService } from '../albums/albums.service';
import { Post } from '../posts/post.entity';
import { PostsService } from '../posts/posts.service';
import { CreateReferencedPostInput } from './dto/create-referenced_post.input';
import { ReferencedPost } from './referenced_post.entity';

@Injectable()
export class ReferencedPostsService {
  constructor(
    @InjectRepository(ReferencedPost) private referencedPostRepository: Repository<ReferencedPost>,
    @Inject(forwardRef(() => PostsService)) private postsService: PostsService,
    @Inject(forwardRef(() => AlbumsService)) private albumsService: AlbumsService,
  ) {}

  findAll() {
    return this.referencedPostRepository.find()
  }

  create(createReferencedPostInput: CreateReferencedPostInput, userId: string) {
    const newReferencedPost = this.referencedPostRepository.create({
      userId,
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

  findAllByUser(userId: string): Promise<ReferencedPost[]> {
    return this.referencedPostRepository.findBy({ userId });
  }

  getPost(postId: string): Promise<Post> {
    return this.postsService.findOne(postId);
  }

  getAlbum(albumId: string): Promise<Album> {
    return this.albumsService.findOne(albumId);
  }
}
