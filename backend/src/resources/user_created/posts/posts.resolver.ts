import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { User } from 'src/resources/user_relations/user/user.entity';
import { Comment } from '../comments/comment.entity';
import { Like } from '../likes/like.entity';
import { UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/resources/auth/guards/authenticated.guard';

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
  createPost(@Args('createPostInput') createPostInput: CreatePostInput, @Context() context): Promise<Post> {
    return this.postsService.create(context.req.user.id, createPostInput);
  }

  @Mutation(returns => Post)
  @UseGuards(AuthenticatedGuard)
  referencePostInAlbum(@Args('albumId') albumId: string, @Args('postId') postId: string, @Context() context): Promise<Post> {
    return this.postsService.referencePostInAlbum(context.req.user.id, albumId, postId)
  }

  @ResolveField(returns => User)
  user(@Parent() post: Post): Promise<User> {
    return this.postsService.getOwner(post.userId)
  }

  @ResolveField(returns => Comment)
  comments(@Parent() post: Post): Promise<Comment[]> {
    return this.postsService.getComments(post.id)
  }

  @ResolveField(returns => Like)
  likes(@Parent() post: Post): Promise<Like[]> {
    return this.postsService.getLikes(post.id)
  }
}
