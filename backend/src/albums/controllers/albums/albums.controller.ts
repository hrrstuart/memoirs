import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dtos/CreateAlbum.dto';
import { AlbumsService } from 'src/albums/services/albums/albums.service';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { Album, User } from 'src/typeorm';
import { AuthUser } from 'src/utils/decorators';

@Controller('albums')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) {}

    @Get('')
    getAlbums() {
        const albums = this.albumsService.getAlbums();
        albums.then(a => console.log(a.map(al => al.owner)))
        return albums;
    }

    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('create')
    @UsePipes(ValidationPipe)
    async createAlbum(@AuthUser() user: User, @Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
        const newAlbum = await this.albumsService.createAlbum(createAlbumDto, user);
        return newAlbum;
    }
}
