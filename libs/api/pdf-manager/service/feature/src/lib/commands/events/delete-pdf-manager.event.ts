//import { FileCategory } from "@prisma/client";

export class DeletePdfEvent  {
    constructor(
      public readonly id: string,
    ) {}
}