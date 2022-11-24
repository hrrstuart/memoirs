import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from 'class-transformer';
import { Repository } from "typeorm";
import { User as UserEntity } from 'src/typeorm';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { SerializedUser } from '../../types';
import { UploadService } from 'src/utils/upload.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @Inject(UploadService) private readonly uploadService: UploadService
    ) {}

    async getAllUsers() {
        return (await this.userRepository.find()).map(u => plainToClass(SerializedUser, u));
    }

    async uploadProfilePicture(id: string, file: Express.Multer.File) {
        const newPfp = await this.uploadService.uploadFile(file, `user_avatars/${id}`);
        return await this.userRepository.update(id, { avatar_url: newPfp.Location });
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
