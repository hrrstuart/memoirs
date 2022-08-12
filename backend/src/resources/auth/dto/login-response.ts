import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/resources/user/user.entity";

@ObjectType()
export class LoginResponse {
    @Field(type => User)
    user: User;
}