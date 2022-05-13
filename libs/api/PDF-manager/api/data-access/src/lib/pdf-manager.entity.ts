import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PdfManagerEntity {
    @Field()
    name: string

    @Field()
    path: string
}
