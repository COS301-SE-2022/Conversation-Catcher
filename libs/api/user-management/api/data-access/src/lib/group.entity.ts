import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GroupEntity {
  @Field()
  name: string;

  @Field()
  admin: string;

  @Field(() => [String])
  users: [string];

  @Field(() => [String])
  pdfs: [string];

  @Field(() => [String])
  requests: [string];
}
