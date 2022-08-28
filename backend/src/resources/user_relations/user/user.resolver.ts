import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { UserService } from './user.service';

// Entities
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Comment } from '../../user_created/comments/comment.entity';
import { PostLike } from '../../user_created/post_likes/postlike.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { User } from './user.entity';
import { AlbumMember } from '../album_member/album-member.entity';
import { Follow } from '../follow/follow.entity';
import { ReferencedPost } from 'src/resources/user_created/referenced_posts/referenced_post.entity';

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(returns => [User])
    users(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Query(returns => User)
    getUser(
      @Args('query', {type: () => String}) query: string,
      @Args('type', { type: () => String, defaultValue: "id" } ) type: string
    ): Promise<User> {
        return this.userService.findOne(type, query);
    }

    @Mutation(returns => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        return this.userService.createUser(createUserInput);
    }

    @ResolveField(returns => [Post])
    posts(@Parent() user: User): Promise<Post[]> {
      return this.userService.getPosts(user.id);
    }
  
    @ResolveField(returns => [Post])
    referencedPosts(@Parent() user: User): Promise<ReferencedPost[]> {
      return this.userService.getReferencedPosts(user.id);
    }

    @ResolveField(returns => [Album])
    albums(@Parent() user: User): Promise<Album[]> {
      return this.userService.getAlbums(user.id);
    }
  
    @ResolveField(returns => [AlbumMember])
    albumMemberships(@Parent() user: User): Promise<AlbumMember[]> {
      return this.userService.getAlbumMemberships(user.id);
    }

    @ResolveField(returns => [Comment])
    comments(@Parent() user: User): Promise<Comment[]> {
      return this.userService.getComments(user.id);
    }
  
    @ResolveField(returns => [PostLike])
    likes(@Parent() user: User): Promise<PostLike[]> {
      return this.userService.getLikes(user.id);
    }
  
    @ResolveField(returns => [Follow])
    following(@Parent() user: User): Promise<Follow[]> {
      return this.userService.getFollowing(user.id);
    }
}
