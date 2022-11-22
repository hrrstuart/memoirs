import { Exclude } from "class-transformer"

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
}

export class SerializedUser {
    id: string;
    email: string;
    username: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<SerializedUser>) {
        Object.assign(this, partial)
    }
}