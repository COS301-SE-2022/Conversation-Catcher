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
  pdf?: string;

  @Field()
  creationDate: Date;

  @Field({nullable: true})
  text?: string

  @Field()
  downloaded: boolean;
}
