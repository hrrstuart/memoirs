import { LikeTypes } from "..";

export interface IReactions {
    replies?: IComment[] | number;
    likes: ILike[] | number;
}

export interface IComment {
    content: string;
    createdAt: number;
    likes: number;
    owner: string;
    reactions: IReactions;
}

export interface ILike {
    likedBy: string;
    likedAt: number;
    itemLiked: LikeTypes;
    reactions: IReactions;
}