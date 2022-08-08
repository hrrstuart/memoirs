import "reflect-metadata"
import { DataSource } from "typeorm"
import { Follow } from "./entity/following/Follow"
import { FollowType } from "./entity/following/FollowType"
import { Album } from "./entity/interactions/album/Album"
import { AlbumMember } from "./entity/interactions/album/AlbumMember"
import { Comment } from "./entity/interactions/post/Comment"
import { Post } from "./entity/interactions/post/Post"
import { Reaction } from "./entity/reactions/Reaction"
import { ReactionType } from "./entity/reactions/ReactionType"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Harry,celtic1",
    database: "Atorus",
    synchronize: true,
    logging: false,
    entities: [User, Post, Album, AlbumMember, Follow, FollowType, Reaction, ReactionType, Comment],
    migrations: [],
    subscribers: [],
})
