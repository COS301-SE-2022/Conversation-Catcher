import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field()
  email: string;

  @Field()
  colour: string;

  @Field(() => [String], {nullable: 'items'})
  pdfs: string[];
}
