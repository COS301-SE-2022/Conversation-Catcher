import { Injectable } from '@nestjs/common';
//import { FileCategory, SocialMedia } from '@prisma/client';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeletePdfCommand } from "./commands/impl/delete-pdf-manager.command";
import { SetNamePdfCommand, SetDownloadedPdfCommand } from "./commands/impl/set-pdf-manager.command";
import { GetPdfByIdQuery, GetPdfsQuery } from "./queries/impl";

@Injectable()
export class ApiPdfManagerServiceFeatureService {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}
    // GetPdfById, GetPdfs, SetNamePdf, SetDownloadedPdf, DeletePdf
    async getPdfById(id : string) {
        return await this.queryBus.execute( new GetPdfByIdQuery(id))
    }
    async getPdfs(userid : string) {
        return await this.queryBus.execute( new GetPdfsQuery(userid))
    }
    async SetNamePdf(id : string, name : string) {
        return await this.commandBus.execute( new SetNamePdfCommand(id, name))
    }
    async SetDownloadedPdf(id : string) {
        return await this.commandBus.execute( new SetDownloadedPdfCommand(id))
    }
    async DeletePdf(id : string) {
        return await this.commandBus.execute( new DeletePdfCommand(id))
    }
}
