import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLikeInput {

  @Field()
  postId: string;

}
