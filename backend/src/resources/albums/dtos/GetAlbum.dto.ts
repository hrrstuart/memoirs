import { IsBoolean } from 'class-validator';

export class GetAlbumDto {

    @IsBoolean()
    images?: boolean = false;

    @IsBoolean()
    owner?: boolean = false;

}