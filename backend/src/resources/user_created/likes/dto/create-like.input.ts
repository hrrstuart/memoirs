import { InputType, Int, Field } from '@nestjs/graphql';
import { GraphQLEnumType } from 'graphql';

export const ParentType = new GraphQLEnumType({
  name: "ParentType",
  description: "Defines the type of item that has been liked",
  values: {
    POST: {
      value: "posts"
    },
    COMMENT: {
      value: "comments"
    },
    ALBUM: {
      value: "albums"
    }
  }
})

@InputType()
export class CreateLikeInput {

  @Field()
  user_id: string;

  @Field()
  parent_id: string;
  
  @Field()
  parent_type: string;

}
