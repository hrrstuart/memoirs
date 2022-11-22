import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

}