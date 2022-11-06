import { Album } from "./entities/Album";
import { Post } from "./entities/Post";
import { SessionEntity } from "./entities/Session";
import { User } from "./entities/User";

export { Album, User, SessionEntity, Post };

const entities = [Album, Post, User, SessionEntity];
export default entities;