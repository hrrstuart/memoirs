import { Injectable } from '@nestjs/common';
import { UserService } from '../user_relations/user/user.service';
import { compare } from "bcrypt"
import { User } from '../user_relations/user/user.entity';

@Injectable()
export class AuthService {
    constructor (private usersService: UserService) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findOne("username", username);
        const passwordIsValid = await compare(password, user.password);

        if (user && passwordIsValid) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }

    login(user: User) {
        return { user }
    }
}
