import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserFollowInput {

  @Field()
  followingId: string;

}
