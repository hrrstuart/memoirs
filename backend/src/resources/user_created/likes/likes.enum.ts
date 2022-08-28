import { registerEnumType } from "@nestjs/graphql";

export enum LikeType {
    COMMENT = "COMMENT",
    POST = "POST"
}

registerEnumType(LikeType, {
    name: "LikeType",
})