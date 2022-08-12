import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

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
        console.log('Payload as: ', payload);
        const { password, ...rest } = await this.userService.findOne("id", payload.id);
        done(null, rest);
    }
}