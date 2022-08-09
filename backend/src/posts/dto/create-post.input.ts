import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  userId: string;

  @Field()
  album_id: string;

  @Field()
  image_url: string;
}
