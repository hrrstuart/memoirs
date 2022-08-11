import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  userId: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  albumId: string;

  @Field()
  image_url: string;
}
