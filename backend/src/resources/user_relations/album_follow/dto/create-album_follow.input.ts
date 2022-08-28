import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAlbumFollowInput {

  @Field()
  albumId: string;

}
