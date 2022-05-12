import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ApiPdfManagerService } from "@conversation-catcher/api/pdf-manager/service";
import { PdfEntity } from "@conversation-catcher/api/database-manager/api/interface"

@Resolver()
export class PdfManagerApiResolver {
	constructor(private pdfService: ApiPdfManagerService) {}

	@Query(() => PdfEntity)
	async getPDFById(@Args('c=pdfID', { type: () => String }) id: string) {
		const pdfArr = id;//"" = await this.pdfService.getPDFById(id);
  
		if (pdfArr.length > 0) {
			const pdfObj = new PdfEntity();
			//pdfObj.id = pdfArr.id;
			//pdfObj.name = pdfArr.name;
			//pdfObj.path = pdfArr.path;
			//pdfObj.creationDate = pdfArr.creationDate
			//pdfObj.dowloaded = pdfArr.dowloaded
			
			return pdfObj;
		}

	  return null;
	}

	@Query(() => [PdfEntity], { nullable: true })
	async GetListOfCompanies() {
		const pdfsArr = "";// = await this.pdfService.getPDFs();

		if (pdfsArr.length > 0) {
			const arrOfPDFs = new Array<PdfEntity>();

			for (let index = 0; index < pdfsArr.length; index++) {
				//const pdf = pdfsArr[index];

				const pdfsObj = new PdfEntity();
		
				//pdfsObj.id = pdf.id;
				//pdfsObj.name = pdf.name;
				//pdfsObj.path = pdf.path;
				//pdfObj.dowloaded = pdf.dowloaded

				arrOfPDFs.push(pdfsObj);
			}
		
			return arrOfPDFs;
		} 
	}

	@Mutation(() => PdfEntity)
  	async renamePDF(@Args('id', { type: () => [String] }) id: string, @Args('name', { type: () => String }) name: string) {
		const pdf = new PdfEntity(); //this.pdfService.rename(id, name); 
		
		//remove later
		const build = id + name;
		pdf.name = build;
		
		return pdf;
	}

	@Mutation(() => PdfEntity)
  	async downloadPDF(@Args('id', { type: () => [String] }) id: string) {
		const pdf = new PdfEntity(); //this.pdfService.download(name); 
		
		//remove later
		const build = id;
		pdf.id = build;
		
		return pdf;
	}
}
