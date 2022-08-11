import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/resources/user/user.entity";

@ObjectType()
export class LoginResponse {
    @Field()
    token: string;

    @Field(type => User)
    user: User;
}