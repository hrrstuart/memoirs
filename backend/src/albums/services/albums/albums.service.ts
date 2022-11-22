import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDto } from 'src/albums/dtos/CreateAlbum.dto';
import { Album as AlbumEntity, User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
    constructor(@InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>) {}

    getAlbums() {
        return this.albumRepository.find();
    }

    async getAlbumById(id: string): Promise<AlbumEntity> {
        return this.albumRepository.findOne({ where: { id }, relations: ['owner', 'posts'] });
    }

    async createAlbum(albumDto: CreateAlbumDto, user: User) {
        const album = this.albumRepository.create({
            owner: user,
            ...albumDto
        });
        return this.albumRepository.save(album);
    }

    deleteAlbum(albumId: string) {
        return this.albumRepository.delete({ id: albumId })
    }
}
