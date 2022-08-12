import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from "bcrypt"
import { User } from '../user/user.entity';

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
        // const { password, ...rest } = user;

        console.log('User: ', user);
        return { user }
    }
}
