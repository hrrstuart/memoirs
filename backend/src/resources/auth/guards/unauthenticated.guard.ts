import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

// If a user is already signed in and shouldn't be able to do something
// i.e. A signed in user trying to sign in again
@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context)
        const req = ctx.getContext().req;
        return req.isUnauthenticated();
    }
}