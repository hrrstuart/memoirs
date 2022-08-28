import { CreateCommentLikeInput } from './create-like.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLikeInput extends PartialType(CreateCommentLikeInput) {
  @Field(() => Int)
  id: number;
}
