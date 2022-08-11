import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "../user/user.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private userService: UserService
    ) {
        super();
    }

    serializeUser(user: any, done: (err: Error, user: any) => void) {
        done(null, user.id);
    }
    
    async deserializeUser(payload: any, done: (err: Error, user: any) => void) {
        const { password, ...rest } = await this.userService.findOne("id", payload);
        done(null, rest)
    }
}