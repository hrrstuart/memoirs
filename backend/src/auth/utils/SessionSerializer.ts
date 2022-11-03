import { PassportSerializer } from "@nestjs/passport";
import { Inject } from "@nestjs/common";
import { User } from "src/typeorm";
import { UsersService } from "src/users/services/users/users/users.service";

export class SessionSerializer extends PassportSerializer {
    constructor(@Inject(UsersService) private readonly userService: UsersService) {
        super();
    }

    serializeUser(user: User, done: (err, user: User) => void) {
        done(null, user);
    }

    async deserializeUser(user: User, done: (err, user: User) => void) {
        const userDB = await this.userService.findUserById(user.id);
        return userDB ? done(null, userDB) : done(null, null);
    }
}