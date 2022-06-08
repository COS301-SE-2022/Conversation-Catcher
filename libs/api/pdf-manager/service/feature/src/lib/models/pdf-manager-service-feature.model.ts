import { AggregateRoot } from "@nestjs/cqrs";
//import { FileCategory } from "@prisma/client";

/*
id
name
path
creationDate
downloaded
*/

export class PdfManagerServiceModel extends AggregateRoot {
    constructor() {
      super();
    }
    id?: string;
    name?: string;
    path?: string;
    creationDate?: Date;
    downloaded?: boolean;
  }