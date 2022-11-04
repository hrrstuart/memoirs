import { Album } from "./entities/Album";
import { SessionEntity } from "./entities/Session";
import { User } from "./entities/User";

export { Album, User, SessionEntity };

const entities = [Album, User, SessionEntity];
export default entities;