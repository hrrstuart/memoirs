import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReferencedPostInput {

  @Field()
  postId: string;

  @Field()
  albumId: string;

}
