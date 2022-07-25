import { IPost } from "../posts/post";

export interface IAlbum {
    ownerID: string;
    information: {
        title: string;
        description?: string;
        createdAt: string;
        updatedAt: string;
    }
    posts: IPost[];
    settings: {
        admins?: string[];
    }
}