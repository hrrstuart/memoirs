import { ExecutionContext, CanActivate, Injectable, Inject } from "@nestjs/common";
import { Request } from 'express';
import { CreatePostDto } from "src/resources/posts/dtos/CreatePost.dto";
import { User } from "src/typeorm";
import { Album, AlbumViewingPrivacy } from "src/typeorm/entities/Album";
import { AlbumsService } from "../services/albums/albums.service";

@Injectable()
export class CanView implements CanActivate {
    constructor(@Inject(AlbumsService) private readonly albumService: AlbumsService) {}

    async canActivate(context: ExecutionContext): Promise<any> {
        const req = context.switchToHttp().getRequest();
        const user = req.user as User;
        const album = await this.albumService.getAlbumById(req.params.id, { owner: true });

        // In future, check whether the album is public, then if user is part of members, then admins, then owner etc.
        let hasPermission = this.hasViewingPermission(album, user.id);
        console.log(hasPermission);
        return hasPermission;
    }

    hasViewingPermission(album: Album, userID: string) {
        return album.viewingPrivacy === AlbumViewingPrivacy.PUBLIC ||
            // (album.viewingPrivacy === AlbumViewingPrivacy.FOLLOWERS_ONLY && album.followers.contains(user.id)) ||
            // (album.privacy === AlbumPrivacy.MEMBERS_ONLY && album.members.contains(user.id)) ||
            (album.viewingPrivacy === AlbumViewingPrivacy.MY_EYES_ONLY && album.owner.id === userID);
    }
}