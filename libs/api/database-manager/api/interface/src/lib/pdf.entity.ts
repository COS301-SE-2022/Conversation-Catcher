import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PdfEntity {
	@Field()
	id: string

	@Field()
	name: string

	@Field()
	path: string

	@Field()
	creationDate: Date
	
	@Field()
	dowloaded: boolean
}
