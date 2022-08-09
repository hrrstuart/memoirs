import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { User } from 'src/resources/user/user.entity';
import { Comment } from '../comments/comment.entity';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput);
  }

  @Query(returns => Post)
  post(@Args('id', { type: () => String }) id: string): Promise<Post> {
    return this.postsService.findOne(id);
  }

  @Query(returns => [Post])
  posts() {
    return this.postsService.findAll();
  }

  @ResolveField(returns => User)
  user(@Parent() post: Post): Promise<User> {
    return this.postsService.getOwner(post.userId)
  }

  @ResolveField(returns => Comment)
  comments(@Parent() post: Post): Promise<Comment[]> {
    return this.postsService.getComments(post.id)
  }
}
