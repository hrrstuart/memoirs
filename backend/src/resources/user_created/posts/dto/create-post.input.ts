import { InputType, Field } from '@nestjs/graphql';
import GraphQlUpload from "graphql-upload/GraphQLUpload.mjs";

@InputType()
export class CreatePostInput {

  @Field({ nullable: true })
  description: string;

  @Field()
  albumId: string;

  @Field(type => GraphQlUpload)
  file: GraphQlUpload;
}
