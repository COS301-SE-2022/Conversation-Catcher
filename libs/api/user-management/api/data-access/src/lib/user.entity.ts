import { Field, ObjectType } from '@nestjs/graphql';

// @ObjectType()
// class Invite {
//   @Field()
//   from: string;
//   @Field()
//   group: string;
// };
@ObjectType()
export class UserEntity {
  @Field()
  email: string;

  @Field()
  colour: string;

  @Field(() => [String], { nullable: 'items' })
  pdfs: string[];

  @Field(() => [String], { nullable: 'items' })
  groups: string[];

  @Field(() => [String], { nullable: 'items' })
  invites: string[];
}
