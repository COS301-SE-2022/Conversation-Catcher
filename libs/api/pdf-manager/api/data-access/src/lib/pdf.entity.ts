import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PdfEntity {
  /*
  id
	name
	pdf
	creationDate
	dowloaded
  */
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({nullable: true})
  summarised?: string;

  @Field({nullable: true})
  text?: string;

  @Field({nullable: true})
  embeddings?: string;

  @Field({nullable : true})
  creationDate: string;

  @Field()
  downloaded: boolean;

  @Field(()=> [String],{nullable:'itemsAndList'})
  tags?: string[];
}
