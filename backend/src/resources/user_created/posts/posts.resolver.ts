import { Resolver, Query, Mutation, Args, Parent, ResolveField, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { createWriteStream } from 'fs';

import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';
import { CreatePostInput } from './dto/create-post.input';
import { PostsService } from './posts.service';

// Entities
import { Comment } from '../comments/comment.entity';
import { Post } from './post.entity';
import { PostLike } from '../post_likes/postlike.entity';
import { ReferencedPost } from '../referenced_posts/referenced_post.entity';
import { User } from 'src/resources/user_relations/user/user.entity';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(returns => Post)
  getPost(@Args('id', { type: () => String }) id: string): Promise<Post> {
    return this.postsService.findOne(id);
  }

  @Query(returns => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @Mutation(returns => Post)
  @UseGuards(AuthenticatedGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context
  ): Promise<Post> {
    // createPostInput.file.createReadStream()
    //   .pipe(createWriteStream(`images/${createPostInput.albumId}/${createPostInput.file.filename}`));

    return this.postsService.create(context.req.user.id, createPostInput);
  }

  @Mutation(returns => Post)
  @UseGuards(AuthenticatedGuard)
  referencePostInAlbum(@Args('albumId') albumId: string, @Args('postId') postId: string, @Context() context): Promise<ReferencedPost> {
    return this.postsService.createReference(context.req.user.id, albumId, postId)
  }

  @ResolveField(returns => User)
  user(@Parent() post: Post): Promise<User> {
    return this.postsService.getOwner(post.userId)
  }

  @ResolveField(returns => [Comment])
  comments(@Parent() post: Post): Promise<Comment[]> {
    return this.postsService.getComments(post.id)
  }

  @ResolveField(returns => [PostLike])
  likes(@Parent() post: Post): Promise<PostLike[]> {
    return this.postsService.getLikes(post.id)
  }

  @ResolveField(returns => [ReferencedPost])
  referenced(@Parent() post: Post): Promise<ReferencedPost[]> {
    return this.postsService.getReferencedPosts(post.id);
  }
}
