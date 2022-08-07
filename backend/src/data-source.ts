import "reflect-metadata"
import { DataSource } from "typeorm"
import { Post } from "./entity/interactions/Post"
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
    entities: [User, Post],
    migrations: [],
    subscribers: [],
})
