export interface IPost {
    caption: string;
    createdAt: number;
    image: string;
    likes: number;
    owner: string;
}

export interface IComment {
    content: string;
    createdAt: number;
    likes: number;
    owner: string;
    replyCount: number;
}