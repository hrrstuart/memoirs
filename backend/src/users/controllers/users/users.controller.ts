import { Controller, Get, HttpException, HttpStatus, Param, Req, Res } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get(':id')
    getUser(
        @Param('username') username: string,
    ) {
        const user = this.usersService.findUserByUsername(username);

        if (user) return user;
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

}
