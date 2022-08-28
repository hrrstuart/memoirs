import { InputType, Field } from '@nestjs/graphql';
import { LikeType } from '../likes.enum';

@InputType()
export class CreateLikeInput {

  @Field()
  parentId: string;
  
  @Field(type => LikeType)
  parentType: LikeType;

}
