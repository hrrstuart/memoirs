import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AlbumPrivacy } from 'src/typeorm/entities/Album';

export class CreateAlbumDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(AlbumPrivacy)
    @IsOptional()
    privacy: AlbumPrivacy;

}