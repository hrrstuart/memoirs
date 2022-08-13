import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';

// Guards
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { GqlAuthGuard } from './guards/gql-auth.gaurd';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => LoginResponse)
    @UseGuards(GqlAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.req.user);
    }

    @Query(() => LoginResponse)
    @UseGuards(AuthenticatedGuard)
    getSomething(@Context() context) {
        return this.authService.login(context.req.user);
    }
}
