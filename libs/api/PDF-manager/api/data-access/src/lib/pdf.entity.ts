import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PdfEntity {
  /*
  id;
	name;
	path;
	creationDate
	dowloaded
  */
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  path: string;

  @Field()
  creationDate: Date;
  
  @Field()
  dowloaded: boolean;
}