import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GroupEntity {
  @Field()
  name: string;

  @Field()
  admin: string;

  @Field(() => [String])
  users: [string];

  @Field({nullable: true})
  description: string;

  @Field(() => [String], { nullable: 'items' })
  pdfs: [string];

  @Field(() => [String], { nullable: 'items' })
  requests: [string];
}
