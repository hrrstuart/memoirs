import { 
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseInterceptors,
    ClassSerializerInterceptor,
    UsePipes,
    UseGuards,
    ValidationPipe,
    UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthenticatedGuard } from 'src/resources/auth/utils/LocalGuard';
import { CreateUserDto } from 'src/resources/users/dtos/CreateUser.dto';
import { UsersService } from 'src/resources/users/services/users/users.service';
import { SerializedUser } from 'src/resources/users/types';
import { User } from 'src/typeorm';
import { AuthUser } from 'src/utils/decorators';
import { UpdateResult } from 'typeorm';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthenticatedGuard)
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

    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload-avatar')
    async createPost(
        @AuthUser() user: User,
        @UploadedFile() file: Express.Multer.File
    ): Promise<UpdateResult> {
        const newUser = await this.usersService.uploadProfilePicture(user.id, file);
        return newUser;
    }

}
