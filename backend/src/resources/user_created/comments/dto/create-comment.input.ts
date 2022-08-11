import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {

  @Field()
  userId: string;

  @Field()
  postId: string;

  @Field()
  content: string;

}
