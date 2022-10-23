import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { User } from 'src/users/types/User';

@Injectable()
export class UsersService {
    private users: User[] = [{
        id: 'a',
        email: 'rr@gmail.com',
        username: 'rr'
    }, {
        id: 'b',
        email: 'hrrstuart@gmail.com',
        username: 'hrrstuart'
    }]

    getAllUsers() {
        return this.users;
    }

    findUserByUsername(username: string) {
        return this.users.find(u => u.username === username);
    }

    createUser(userDto: CreateUserDto) {
        this.users.push(userDto);
    }
}
