import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { ApiPdfManagerServiceFeatureService } from "@conversation-catcher/api/pdf-manager/service/feature";
import { ApiPdfManagerServiceService } from "@conversation-catcher/api/pdf-manager/service";
import { PdfEntity } from "@conversation-catcher/api/pdf-manager/api/data-access"
//yarn nx run api-pdf-manager-api-feature:test

@Resolver()
export class ApiPdfManagerApiFeatureResolver {
	constructor(private otherService: ApiPdfManagerServiceFeatureService, private pdfService: ApiPdfManagerServiceService) {}

	/*
		id - id of pdf in DB
		name - name of pdf
		pdf - the pdf
		creationDate - date when file was created
		dowloaded - if the pdf is stored locally or not
	*/

	// get a single pdf by its id
	@Query(() => PdfEntity)
	async getPDFById(@Args('id', { type: () => String }) id: string) {
		const pdfArr = await this.pdfService.getPdfById(id);

		if (pdfArr.length > 0) {
			const pdfObj = new PdfEntity();
			pdfObj.id = pdfArr.id;
			pdfObj.name = pdfArr.name;
			pdfObj.pdf = pdfArr.pdf;
			pdfObj.creationDate = pdfArr.creationDate;
			pdfObj.downloaded = pdfArr.downloaded;

			return pdfObj;
		}

	  	return null;
	}

	// get all of the user's pdfs
	@Query(() => [PdfEntity], { nullable: true })
	async getPDFs(@Args('id', { type: () => String }) userid: string) {
		const pdfsArr = await this.pdfService.getPdfs(userid);

		if (pdfsArr.length > 0) {
			const arrOfPDFs = new Array<PdfEntity>();

			for (let index = 0; index < pdfsArr.length; index++) {
				const pdf = pdfsArr[index];
				const pdfsObj = new PdfEntity();

				pdfsObj.id = pdf.id;
				pdfsObj.name = pdf.name;
				pdfsObj.pdf = pdf.pdf.toString('ascii');
				pdfsObj.creationDate = pdf.creationDate;
				pdfsObj.downloaded = pdf.downloaded;

				arrOfPDFs.push(pdfsObj);
			}

			return arrOfPDFs;
		}
	}

	// rename the pdf with this id
	@Mutation(() => PdfEntity)
  	async renamePDF(@Args('id', { type: () => [String] }) id: string, @Args('name', { type: () => String }) name: string) {
		const pdfArr = await this.pdfService.SetNamePdf(id, name);

		if (pdfArr.length > 0) {
			const pdfObj = new PdfEntity();
			pdfObj.id = pdfArr.id;
			pdfObj.name = pdfArr.name;
			pdfObj.pdf = pdfArr.pdf.toString('ascii');
			pdfObj.creationDate = pdfArr.creationDate;
			pdfObj.downloaded = pdfArr.downloaded;

			return pdfObj;
		}

		return null;
	}

	// change if true to false and if false to true and change the file appropraitely
	@Mutation(() => PdfEntity)
  	async downloadedPDF(@Args('id', { type: () => [String] }) id: string) {
		const pdfArr = await this.pdfService.SetDownloadedPdf(id);
      console.log(pdfArr);
		if (pdfArr.length > 0) {
			const pdfObj = new PdfEntity();
			pdfObj.id = pdfArr.id;
			pdfObj.name = pdfArr.name;
			pdfObj.pdf = pdfArr.pdf.toString('ascii');
			pdfObj.creationDate = pdfArr.creationDate;
			pdfObj.downloaded = pdfArr.downloaded;

			return pdfObj;
		}
	  	return null;
	}

	// delete pdf with this id from DB
	@Mutation(() => PdfEntity)
  	async deletePDF(@Args('id', { type: () => [String] }) id: string) {
		await this.pdfService.DeletePdf(id);
		//const pdfArr = await this.pdfService.DeletePdf(id);

		/*if (pdfArr.length > 0) {
			const pdfObj = new PdfEntity();
			pdfObj.id = pdfArr.id;
			pdfObj.name = pdfArr.name;
			pdfObj.pdf = pdfArr.pdf.toString('ascii');
			pdfObj.creationDate = pdfArr.creationDate;
			pdfObj.downloaded = pdfArr.downloaded;

			return pdfObj;
		}

		return null;*/
	}
}
