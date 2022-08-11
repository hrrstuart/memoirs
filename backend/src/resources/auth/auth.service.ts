import { Injectable } from '@nestjs/common';
import { compare } from "bcrypt";
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne("username", username);
        const passwordIsValid = await compare(password, user.password);

        if (user && passwordIsValid) {
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }
}
