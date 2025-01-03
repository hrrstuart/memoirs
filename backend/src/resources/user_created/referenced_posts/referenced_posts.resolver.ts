import { Resolver, Query, Mutation, Args, Parent, ResolveField, Context } from '@nestjs/graphql';
import { ReferencedPostsService } from './referenced_posts.service';
import { ReferencedPost } from './referenced_post.entity';
import { CreateReferencedPostInput } from './dto/create-referenced_post.input';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';
import { Post } from '../posts/post.entity';
import { Album } from '../albums/album.entity';
import { User } from 'src/resources/user_relations/user/user.entity';

@Resolver(of => ReferencedPost)
export class ReferencedPostsResolver {
  constructor(private readonly referencedPostsService: ReferencedPostsService) {}

  @Query(() => [ReferencedPost])
  referencedPosts() {
    return this.referencedPostsService.findAll();
  }

  @Mutation(() => ReferencedPost)
  @UseGuards(AuthenticatedGuard)
  createReferencedPost(@Args('createReferencedPostInput') createReferencedPostInput: CreateReferencedPostInput, @Context() context): Promise<ReferencedPost> {
    return this.referencedPostsService.create(createReferencedPostInput, context.req.user.id);
  }

  @Query(() => ReferencedPost, { name: 'referencedPost' })
  findByAlbum(@Args('albumId', { type: () => String }) albumId: string) {
    return this.referencedPostsService.findAllByAlbum(albumId);
  }

  @ResolveField(returns => Post)
  post(@Parent() referencedPost: ReferencedPost): Promise<Post> {
    return this.referencedPostsService.getPost(referencedPost.postId);
  }

  @ResolveField(returns => Album)
  album(@Parent() referencedPost: ReferencedPost): Promise<Album> {
    return this.referencedPostsService.getAlbum(referencedPost.albumId);
  }

  @ResolveField(returns => User)
  user(@Parent() referencedPost: ReferencedPost): Promise<User> {
    return this.referencedPostsService.getUser(referencedPost.userId);
  }
}
