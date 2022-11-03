import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from 'class-transformer';
import { Repository } from "typeorm";
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User as IUser } from 'src/users/types';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async getAllUsers() {
        return (await this.userRepository.find()).map(u => plainToClass(SerializedUser, u));
    }

    findUserByUsername(username: string) {
        return this.userRepository.findOneBy({ username })
    }

    findUserById(id: string) {
        return this.userRepository.findOneBy({ id })
    }

    createUser(userDto: CreateUserDto) {
        const user = this.userRepository.create(userDto);
        return this.userRepository.save(user);
    }
}
