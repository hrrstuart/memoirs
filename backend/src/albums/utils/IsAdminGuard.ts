import { ExecutionContext, CanActivate, Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from 'express';
import { CreatePostDto } from "src/posts/dtos/CreatePost.dto";
import { User } from "src/typeorm";
import { AlbumsService } from "../services/albums/albums.service";

@Injectable()
export class IsAdminGuard implements CanActivate {
    constructor(@Inject(AlbumsService) private readonly albumService: AlbumsService) {}

    async canActivate(context: ExecutionContext): Promise<any> {
        const req = context.switchToHttp().getRequest<Request<any, any, CreatePostDto>>();
        console.log('User:', req.user)
        const user = req.user as User;
        
        const album = await this.albumService.getAlbumById(req.body.albumId);
        console.log('Album: ', album)
        return user.id === album.owner.id;
    }
}