import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
    constructor() {
        super();
    }

    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;
        const request = this.getRequest(context);
        await super.logIn(request);
        return result;
    }
    
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context)
        const request = ctx.getContext().req;
        request.body = ctx.getArgs().loginUserInput;

        return request;
    }
}