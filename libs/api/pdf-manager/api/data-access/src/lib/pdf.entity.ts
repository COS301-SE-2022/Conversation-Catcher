import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PdfEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  summarised?: string;

  @Field({ nullable: true })
  text?: string;

  @Field(() => [Number], { nullable: 'itemsAndList' })
  embeddings?: number[];

  @Field({ nullable: true })
  creationDate: string;

  @Field()
  downloaded: boolean;

  @Field(() => [String], { nullable: 'itemsAndList' })
  tags?: string[];
}

@InputType()
export class PdfEntityInput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  summarised?: string;

  @Field()
  text: string;

  @Field(() => [Number], { nullable: 'itemsAndList' })
  embeddings: number[];

  @Field({ nullable: true })
  creationDate: string;

  @Field({ nullable: true })
  downloaded: boolean;

  @Field(() => [String], { nullable: 'itemsAndList' })
  tags?: string[];
}
