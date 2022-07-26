import { IPost } from "../posts/post";

export interface IAlbum {
    albumID: string;
    thumbnail?: string;
    ownerID: string;
    information: {
        title: string;
        description?: string;
        createdAt: number;
        updatedAt: number;
    }
    posts: IPost[];
    settings: {
        admins?: string[];
    }
}