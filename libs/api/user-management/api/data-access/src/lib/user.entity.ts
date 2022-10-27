import { Field, InputType, ObjectType } from '@nestjs/graphql';

// @ObjectType()
// class Invite {
//   @Field()
//   from: string;
//   @Field()
//   group: string;
// };
@ObjectType()
export class ColourOut {
  @Field()
  accent: string;
  @Field()
  mode: string;
  @Field()
  bottom: string;
  @Field()
  low: string;
  @Field()
  high: string;
  @Field()
  top: string;
}

@ObjectType()
export class UserEntity {
  @Field()
  email: string;

  @Field()
  colour: ColourOut;

  @Field(() => [String], { nullable: 'items' })
  pdfs: string[];

  @Field(() => [String], { nullable: 'items' })
  groups: string[];

  @Field(() => [String], { nullable: 'items' })
  invites: string[];
}

@InputType()
export class ColourObj {
  @Field()
  accent: string;
  @Field()
  mode: string;
  @Field()
  bottom: string;
  @Field()
  low: string;
  @Field()
  high: string;
  @Field()
  top: string;
}
