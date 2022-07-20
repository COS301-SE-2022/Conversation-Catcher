import { Resolver } from '@nestjs/graphql';
import { /*Query,*/ Args, Mutation } from '@nestjs/graphql';
import { ApiSummariseTextServiceService } from "@conversation-catcher/api/summarise-text/service";

@Resolver()
export class ApiSummariseTextApiResolver {
    constructor(private service: ApiSummariseTextServiceService){};
    /*{
        this.errorObj = new PdfEntity();
        this.errorObj.id = 'error';
        this.errorObj.name = 'error';
        this.errorObj.pdf = null;
        this.errorObj.downloaded = false;
    }
    private errorObj;*/

    @Mutation()
    async Summarise(@Args('text', { type: () => [String] }) text: string) {
        await this.service.Summarise(text);
        
        /*if (pdfArr != undefined) {
            const pdfObj = new PdfEntity();
            pdfObj.id = pdfArr.id;
            pdfObj.name = pdfArr.name;
            pdfObj.pdf = pdfArr.pdf.toString('ascii');
            pdfObj.creationDate = pdfArr.creationDate;
            pdfObj.downloaded = pdfArr.downloaded;

            return pdfObj;
        }

        return this.errorObj;*/
    }
}
