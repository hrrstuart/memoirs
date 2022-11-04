import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDto } from 'src/albums/dtos/CreateAlbum.dto';
import { Album as AlbumEntity, User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
    constructor(@InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>) {}

    async getAlbums() {
        return this.albumRepository.find();
    }

    async createAlbum(albumDto: CreateAlbumDto, user: User) {
        const album = this.albumRepository.create({
            owner: user,
            ...albumDto
        });
        return this.albumRepository.save(album);
    }
}
