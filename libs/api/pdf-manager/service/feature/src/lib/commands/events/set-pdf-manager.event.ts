//import { FileCategory } from "@prisma/client";

export class SetDownloadedPdfEvent  {
    constructor(
      public readonly id: string
    ) {}
}

export class SetNamePdfEvent  {
    constructor(
      public readonly id: string,
      public readonly name: string
    ) {}
}