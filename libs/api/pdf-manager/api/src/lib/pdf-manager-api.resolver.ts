import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { PdfManagerService } from "@conversation-catcher/api/pdf-manager/service";
import { PdfEntity } from "@conversation-catcher/api/pdf-manager/api/data-access";

@Resolver()
export class PdfManagerApiResolver {
	constructor(private pdfService: PdfManagerService) {}

    /*
    PdfEntity layout:
    * id: string
    * name: string
    * path: string
    * creationDate: Date
    * dowloaded: boolean
	
	Functions:
	* getPDFById
	* getPDFs
	* renamePDF
	* downloadPDF
	delete?
	?addPDf?

    */

	@Query(() => PdfEntity)
	async getPDFById(@Args('c=pdfID', { type: () => String }) id: string) {
		const pdfArr = await this.pdfService.getPDFById(id);
  
		if (pdfArr.length > 0) {
			const pdfObj = new PdfEntity();
			pdfObj.id = pdfArr.id;
			pdfObj.name = pdfArr.name;
			pdfObj.path = pdfArr.path;
			pdfObj.creationDate = pdfArr.creationDate
			pdfObj.dowloaded = pdfArr.dowloaded
			
			return pdfObj;
		}

	  return null;
	}

	@Query(() => [PdfEntity], { nullable: true })
	async getPDFs(@Args('id', { type: () => [String] }) userid: string) {
		const pdfsArr = await this.pdfService.getPDFs(userid);

		if (pdfsArr.length > 0) {
			const arrOfPDFs = new Array<PdfEntity>();

			for (let index = 0; index < pdfsArr.length; index++) {
				const pdf = pdfsArr[index];
				const pdfsObj = new PdfEntity();
		
				pdfsObj.id = pdf.id;
				pdfsObj.name = pdf.name;
				pdfsObj.path = pdf.path;
				pdfsObj.dowloaded = pdf.dowloaded

				arrOfPDFs.push(pdfsObj);
			}
		
			return arrOfPDFs;
		} 
	}

	@Mutation(() => PdfEntity)
  	async renamePDF(@Args('id', { type: () => [String] }) id: string, @Args('name', { type: () => String }) name: string) {
		const pdf = this.pdfService.renamePDF(id, name);
		return pdf;
	}

	@Mutation(() => PdfEntity)
  	async downloadPDF(@Args('id', { type: () => [String] }) id: string) {
		const pdf = this.pdfService.downloadPDF(id); 
		return pdf;
	}
}