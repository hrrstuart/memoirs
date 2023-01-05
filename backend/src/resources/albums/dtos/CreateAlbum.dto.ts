import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AlbumViewingPrivacy } from 'src/typeorm/entities/Album';

export class CreateAlbumDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsEnum(AlbumViewingPrivacy)
    @IsOptional()
    viewingPrivacy: AlbumViewingPrivacy;

}