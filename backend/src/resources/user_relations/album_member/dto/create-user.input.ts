import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAlbumMemberInput {
    @Field()
    userId: string;

    @Field()
    albumId: string;

    @Field({ defaultValue: false })
    isAdmin: boolean;
}