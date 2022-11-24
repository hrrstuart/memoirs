import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateAlbumDto } from 'src/resources/albums/dtos/CreateAlbum.dto';
import { DeleteAlbumDto } from 'src/resources/albums/dtos/DeleteAlbum.dto';
import { AlbumsService } from 'src/resources/albums/services/albums/albums.service';
import { IsAdminGuard } from 'src/resources/albums/utils/IsAdminGuard';
import { AuthenticatedGuard } from 'src/resources/auth/utils/LocalGuard';
import { Album, User } from 'src/typeorm';
import { AuthUser } from 'src/utils/decorators';
import { GetAlbumDto } from '../../dtos/GetAlbum.dto';

@Controller('albums')
export class AlbumsController {
    constructor(private albumsService: AlbumsService) {}

    @Get('')
    getAlbums() {
        const albums = this.albumsService.getAlbums();
        return albums;
    }

    @Get('/id/:id')
    getAlbumById(
        @Param('id') id: string,
        @Body() getAlbumDto: GetAlbumDto
    ) {
        return this.albumsService.getAlbumById(id, getAlbumDto);
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
