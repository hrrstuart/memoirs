import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/resources/users/services/users/users.service';
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        @Inject(UsersService) private readonly userService: UsersService
    ) {}

    async validateUser(username: string, password: string) {
        const userDB = await this.userService.findUserByUsername(username);
        const isRightPassword = await compare(password, userDB?.password);
        if (!userDB || !isRightPassword) return null;

        return userDB;

    }
}
