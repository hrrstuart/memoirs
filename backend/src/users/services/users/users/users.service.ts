import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from 'class-transformer';
import { Repository } from "typeorm";
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User as IUser } from 'src/users/types';

@Injectable()
export class UsersService {
    private users: IUser[] = [{
        id: 'a',
        email: 'rr@gmail.com',
        username: 'rr',
        password: 'asd'
    }, {
        id: 'b',
        email: 'hrrstuart@gmail.com',
        username: 'hrrstuart',
        password: 'asd'
    }];

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    getAllUsers() {
        return this.users.map(u => plainToClass(SerializedUser, u));
    }

    findUserByUsername(username: string) {
        return this.users.find(u => u.username === username);
    }

    createUser(userDto: CreateUserDto) {
        const user = this.userRepository.create(userDto);
        return this.userRepository.save(user);
    }
}
