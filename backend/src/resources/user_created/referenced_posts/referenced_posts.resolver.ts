import { Resolver, Query, Mutation, Args, Int, Parent } from '@nestjs/graphql';
import { ReferencedPostsService } from './referenced_posts.service';
import { ReferencedPost } from './referenced_post.entity';
import { CreateReferencedPostInput } from './dto/create-referenced_post.input';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';
import { Post } from '../posts/post.entity';

@Resolver(() => ReferencedPost)
export class ReferencedPostsResolver {
  constructor(private readonly referencedPostsService: ReferencedPostsService) {}

  @Mutation(() => ReferencedPost)
  @UseGuards(AuthenticatedGuard)
  createReferencedPost(@Args('createReferencedPostInput') createReferencedPostInput: CreateReferencedPostInput): Promise<ReferencedPost> {
    return this.referencedPostsService.create(createReferencedPostInput, '');
  }

  @Query(() => ReferencedPost, { name: 'referencedPost' })
  findByAlbum(@Args('albumId', { type: () => String }) albumId: string) {
    return this.referencedPostsService.findAllByAlbum(albumId);
  }

  @Resolver(type => Post)
  post(@Parent() post: ReferencedPost): Promise<Post> {
    return this.referencedPostsService.getPost(post.postId);
  }
}
