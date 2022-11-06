import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {

    @IsNotEmpty()
    @IsString()
    image_url: string;

    @IsNotEmpty()
    @IsString()
    albumId: string;

    @IsString()
    @IsOptional()
    description: string;

}