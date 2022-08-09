import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {

  @Field()
  user_id: string;

  @Field()
  post_id: string;

  @Field()
  content: string;

}
