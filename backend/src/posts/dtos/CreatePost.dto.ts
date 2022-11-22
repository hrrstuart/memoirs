import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsFile } from 'src/utils/isfile.validator';

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    albumId: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsFile({ mime: ['image/jpg', 'image/jpeg', 'image/png'] })
    file: Express.Multer.File;

}