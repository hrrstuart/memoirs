import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types';

@Injectable()
export class UsersService {
    private users: User[] = [{
        id: 'a',
        email: 'rr@gmail.com',
        username: 'rr',
        password: 'asd'
    }, {
        id: 'b',
        email: 'hrrstuart@gmail.com',
        username: 'hrrstuart',
        password: 'asd'
    }]

    getAllUsers() {
        return this.users.map(u => plainToClass(SerializedUser, u));
    }

    findUserByUsername(username: string) {
        return this.users.find(u => u.username === username);
    }

    createUser(userDto: CreateUserDto) {
        this.users.push(userDto);
    }
}
