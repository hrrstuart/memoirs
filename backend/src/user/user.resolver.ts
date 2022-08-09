import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from 'src/posts/post.entity';
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
}
