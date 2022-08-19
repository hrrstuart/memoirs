import { Repository } from 'typeorm';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumMemberInput } from './dto/create-user.input';

// Services
import { UserService } from '../user/user.service';

// Entities
import { AlbumMember } from './album-member.entity';
import { User } from '../user/user.entity';
import { AlbumsService } from 'src/resources/user_created/albums/albums.service';
import { Album } from 'src/resources/user_created/albums/album.entity';

@Injectable()
export class AlbumMemberService {
    constructor(
        @InjectRepository(AlbumMember) private albumRepository: Repository<AlbumMember>,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @Inject(forwardRef(() => AlbumsService)) private albumService: AlbumsService,
    ) {}

    async createAlbumMember(createAlbumMemberInput: CreateAlbumMemberInput): Promise<AlbumMember> {
        const newMember = this.albumRepository.create({
            ...createAlbumMemberInput
        });

        return this.albumRepository.save(newMember);
    }

    findAll(): Promise<AlbumMember[]> {
        return this.albumRepository.find();
    }

    findOne(id: string): Promise<AlbumMember> {
        return this.albumRepository.findOneByOrFail({ id })
    }

    getUser(id: string): Promise<User> {
        return this.userService.findOne("id", id);
    }

    getAlbum(id: string): Promise<Album> {
        return this.albumService.findOne(id);
    }

    findMembersByAlbum(albumId: string): Promise<AlbumMember[]> {
        return this.albumRepository.findBy({ albumId });
    }

    findMembersByUser(userId: string): Promise<AlbumMember[]> {
        return this.albumRepository.findBy({ userId });
    }
}
