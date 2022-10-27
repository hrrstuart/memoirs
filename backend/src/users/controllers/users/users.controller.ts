import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors, ClassSerializerInterceptor, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('')
    getUsers() {
        return this.usersService.getAllUsers();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('username/:username')
    async getUser(@Param('username') username: string) {
        const user = await this.usersService.findUserByUsername(username);

        if (user) return new SerializedUser(user);
        else throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('create')
    @UsePipes(ValidationPipe)
    async createUser(@Body() createUserDto: CreateUserDto) {
        const newUser = await this.usersService.createUser(createUserDto);
        return new SerializedUser(newUser);
    }

}
