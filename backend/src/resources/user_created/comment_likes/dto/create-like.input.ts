import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentLikeInput {

  @Field()
  commentId: string;

}
