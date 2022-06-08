import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { ApiPdfManagerServiceFeatureService } from "@conversation-catcher/api/pdf-manager/service/feature";
import { PdfEntity } from "@conversation-catcher/api/pdf-manager/api/data-access"
//yarn nx run api-pdf-manager-api-feature:test

@Resolver()
export class ApiPdfManagerApiFeatureResolver {
	constructor(private pdfService: ApiPdfManagerServiceFeatureService) {}

	@Query(() => PdfEntity)
	async getPDFById(@Args('c=pdfID', { type: () => String }) id: string) {
		const pdfArr = await this.pdfService.getPdfById(id);
  
		if (pdfArr.length > 0) {
			const pdfObj = new PdfEntity();
			pdfObj.id = pdfArr.id;
			pdfObj.name = pdfArr.name;
			pdfObj.path = pdfArr.path;
			pdfObj.creationDate = pdfArr.creationDate
			pdfObj.downloaded = pdfArr.downloaded
			
			return pdfObj;
		}

	  return null;
	}

	@Query(() => [PdfEntity], { nullable: true })
	async getPDFs(@Args('c=pdfID', { type: () => String }) userid: string) {
		const pdfsArr = await this.pdfService.getPdfs(userid);

		if (pdfsArr.length > 0) {
			const arrOfPDFs = new Array<PdfEntity>();

			for (let index = 0; index < pdfsArr.length; index++) {
				const pdf = pdfsArr[index];
				const pdfsObj = new PdfEntity();
		
				pdfsObj.id = pdf.id;
				pdfsObj.name = pdf.name;
				pdfsObj.path = pdf.path;
				pdfsObj.downloaded = pdf.downloaded

				arrOfPDFs.push(pdfsObj);
			}
		
			return arrOfPDFs;
		} 
	}

	@Mutation(() => PdfEntity)
  	async renamePDF(@Args('id', { type: () => [String] }) id: string, @Args('name', { type: () => String }) name: string) {
		const pdf = this.pdfService.SetNamePdf(id, name);
		return pdf;
	}

	@Mutation(() => PdfEntity)
  	async downloadPDF(@Args('id', { type: () => [String] }) id: string) {
		const pdf = this.pdfService.SetDownloadedPdf(id); 
		return pdf;
	}

	@Mutation(() => PdfEntity)
  	async deletePDF(@Args('id', { type: () => [String] }) id: string) {
		const pdf = this.pdfService.DeletePdf(id); 
		return pdf;
	}
}
