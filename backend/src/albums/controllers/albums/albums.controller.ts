import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dtos/CreateAlbum.dto';
import { DeleteAlbumDto } from 'src/albums/dtos/DeleteAlbum.dto';
import { AlbumsService } from 'src/albums/services/albums/albums.service';
import { IsAdminGuard } from 'src/albums/utils/IsAdminGuard';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuard';
import { Album, User } from 'src/typeorm';
import { AuthUser } from 'src/utils/decorators';

@Controller('albums')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) {}

    @Get('')
    getAlbums() {
        const albums = this.albumsService.getAlbums();
        return albums;
    }

    @Get('/id/:id')
    getAlbumById(@Param('id') id: string) {
        return this.albumsService.getAlbumById(id);
    }

    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('create')
    @UsePipes(ValidationPipe)
    async createAlbum(@AuthUser() user: User, @Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
        const newAlbum = await this.albumsService.createAlbum(createAlbumDto, user);
        return newAlbum;
    }

    
    @UseGuards(AuthenticatedGuard)
    @UseGuards(IsAdminGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Delete('delete')
    @UsePipes(ValidationPipe)
    async deleteAlbum(@Body() deleteAlbumDto: DeleteAlbumDto) {
        return await this.albumsService.deleteAlbum(deleteAlbumDto.albumId);
    }
}
