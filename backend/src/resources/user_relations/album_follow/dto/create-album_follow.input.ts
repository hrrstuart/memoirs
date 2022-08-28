import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateFollowAlbumInput {

  @Field()
  albumId: string;

}
