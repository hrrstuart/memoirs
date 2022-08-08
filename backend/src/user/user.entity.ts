import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => String)
  id: string;

  @Field()
  username: string;

  @Field((type) => Int)
  created_at: number;

  @Field((type) => Int)
  updated_at: number;
}
