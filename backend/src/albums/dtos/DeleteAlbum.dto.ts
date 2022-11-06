import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteAlbumDto {

    @IsNotEmpty()
    @IsString()
    albumId: string;

}