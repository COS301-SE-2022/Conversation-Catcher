//import { FileCategory } from "@prisma/client";

export class DeletePdfCommand {
    constructor(
      public readonly id?: string,
    ) {}
}