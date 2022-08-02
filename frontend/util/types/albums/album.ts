import { IPost } from "../posts/post";

interface IAlbumSettings {
    privacy: {
        private: true;
        whitelist: string[];
    } | {
        private: false;
        blacklist: string[];
    }
}

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
    settings: IAlbumSettings
}