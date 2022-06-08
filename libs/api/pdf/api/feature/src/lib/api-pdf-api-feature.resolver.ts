import { Resolver } from '@nestjs/graphql';
//import { Query, Args, Mutation } from '@nestjs/graphql';
import { ApiPdfServiceFeatureModule } from "@conversation-catcher/api/pdf/service/feature";
//import { PdfEntity } from "@conversation-catcher/api/pdf/api/data-access"

@Resolver()
export class ApiPdfApiFeatureResolver {
	constructor(private pdfService: ApiPdfServiceFeatureModule) {}

	/*@Query(() => PdfEntity)
	async getPDFById(@Args('c=pdfID', { type: () => String }) id: string) {
		const pdfArr = await this.pdfService.getPDFById(id);
  
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
	async getPDFs() {
		const pdfsArr = await this.pdfService.getPDFs();

		if (pdfsArr.length > 0) {
			const arrOfPDFs = new Array<PdfEntity>();

			for (let index = 0; index < pdfsArr.length; index++) {
				const pdf = pdfsArr[index];
				const pdfsObj = new PdfEntity();
		
				pdfsObj.id = pdf.id;
				pdfsObj.name = pdf.name;
				pdfsObj.path = pdf.path;
				pdfsObj.downloaded = pdf.dowloaded

				arrOfPDFs.push(pdfsObj);
			}
		
			return arrOfPDFs;
		} 
	}

	@Mutation(() => PdfEntity)
  	async renamePDF(@Args('id', { type: () => [String] }) id: string, @Args('name', { type: () => String }) name: string) {
		const pdf = this.pdfService.rename(id, name);
		return pdf;
	}

	@Mutation(() => PdfEntity)
  	async downloadPDF(@Args('id', { type: () => [String] }) id: string) {
		const pdf = this.pdfService.download(id); 
		return pdf;
	}*/
}