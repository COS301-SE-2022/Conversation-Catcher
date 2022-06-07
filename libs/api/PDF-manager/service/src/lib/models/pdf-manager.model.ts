import { AggregateRoot } from "@nestjs/cqrs";

export class PdfManagerModel extends AggregateRoot {
    constructor() {
      super();
    }
    
    /*
    PdfEntity layout:
    * id: string
    * name: string
    * path: string
    * creationDate: Date
    * dowloaded: boolean
    */

    id?: string
    name?: string
    path?: string
    creationDate?: Date
    dowloaded?: boolean
}