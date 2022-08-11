import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Album } from 'src/resources/user_created/albums/album.entity';
import { Post } from 'src/resources/user_created/posts/post.entity';
import { Comment } from '../user_created/comments/comment.entity';
import { Like } from '../user_created/likes/like.entity';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(private userService: UserService) {}

    @Query(returns => [User])
    users(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Query(returns => User)
    getUser(@Args('id', {type: () => String}) id: string ): Promise<User> {
        return this.userService.findOne(id);
    }

    @Mutation(returns => User)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
        return this.userService.createUser(createUserInput);
    }

    @ResolveField(returns => [Post])
    posts(@Parent() user: User): Promise<Post[]> {
      return this.userService.getPosts(user.id);
    }

    @ResolveField(returns => [Album])
    albums(@Parent() user: User): Promise<Album[]> {
      return this.userService.getAlbums(user.id);
    }

    @ResolveField(returns => [Comment])
    comments(@Parent() user: User): Promise<Comment[]> {
      return this.userService.getComments(user.id);
    }
  
    @ResolveField(returns => [Like])
    likes(@Parent() user: User): Promise<Like[]> {
      return this.userService.getLikes(user.id);
    }
}
