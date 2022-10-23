import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('')
    getUsers() {
        return this.usersService.getAllUsers();
    }

    @Get('/search/:username')
    getUser(@Param('username') username: string) {
        const user = this.usersService.findUserByUsername(username);

        if (user) return user;
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    @Post('create')
    createUser(@Body() createUserDto: CreateUserDto) {
        this.usersService.createUser(createUserDto);
    }

}
