import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "../user_relations/user/user.entity";
import { UserService } from "../user_relations/user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private userService: UserService
    ) {
        super();
    }

    serializeUser(user: User, done: (err: Error, user: User) => void) {
        done(null, user);
    }
    
    async deserializeUser(payload: User, done: (err: Error, user: any) => void) {
        const { password, ...rest } = await this.userService.findOne("id", payload.id);
        done(null, rest);
    }
}