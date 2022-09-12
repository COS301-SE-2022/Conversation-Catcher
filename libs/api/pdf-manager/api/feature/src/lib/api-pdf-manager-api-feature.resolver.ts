import { Resolver } from '@nestjs/graphql';
import { Query, Args, Mutation } from '@nestjs/graphql';
import { ApiPdfManagerServiceService } from '@conversation-catcher/api/pdf-manager/service/feature';
import { PdfEntity } from '@conversation-catcher/api/pdf-manager/api/data-access';
// import { text } from 'stream/consumers';

@Resolver()
export class ApiPdfManagerApiFeatureResolver {
  constructor(private pdfService: ApiPdfManagerServiceService) {
    this.errorObj = new PdfEntity();
    this.errorObj.id = 'error';
    this.errorObj.name = 'error';
    this.errorObj.pdf = null;
    this.errorObj.downloaded = false;
    this.errorObj.text = null;
    this.errorObj.creationDate = null;
    this.errorObj.tags = null;
  }
  private errorObj;

  /*
		id - id of pdf in DB
		name - name of pdf
		pdf - the pdf
		creationDate - date when file was created
		dowloaded - if the pdf is stored locally or not
	*/

  //Assign received result to PdfEntity object
  assignResult(result) {
    const date = new Date(result.creationDate);
    const pdfObj = new PdfEntity();
    pdfObj.id = result._id;
    pdfObj.name = result.name;
    if (result.pdf != null) pdfObj.pdf = result.pdf.toString('ascii');
    pdfObj.creationDate = date.toUTCString();
    if (result.downloaded != null) pdfObj.downloaded = result.downloaded;
    else pdfObj.downloaded = false;
    pdfObj.text = result.text;
    return pdfObj;
  }

  //Used to force react-native components to refresh
  @Mutation(() => String)
  async reload() {
    return 'reloaded';
  }

  // get a single pdf by its id
  @Query(() => PdfEntity)
  async getPDFById(@Args('id', { type: () => String }) id: string) {
    const pdfArr = await this.pdfService.getPdfById(id);

    if (pdfArr != undefined) {
      return this.assignResult(pdfArr);
    }
    return this.errorObj;
  }

  // get all of the user's pdfs
  @Query(() => [PdfEntity], { nullable: true })
  async getPDFs(@Args('id', { type: () => String }) userid: string) {
    const pdfsArr = await this.pdfService.getPdfs(userid);

    if (pdfsArr != undefined) {
      const arrOfPDFs = new Array<PdfEntity>();

      for (let index = 0; index < pdfsArr.length; index++) {
        const pdf = pdfsArr[index];

        arrOfPDFs.push(this.assignResult(pdf));
      }

      return arrOfPDFs;
    }
    return [this.errorObj];
  }

  @Mutation(() => String)
  async updateTags(
    @Args('id') id: string,
    @Args('tags', { type: () => [String] }) tags: string[]
  ) {
    return await this.pdfService.updateTags(id, tags);
  }

  // add pdf to db connected to this user
  @Mutation(() => PdfEntity)
  async addPDF(
    @Args('email') email: string,
    @Args('name') name: string,
    @Args('text') text: string
  ) {
    const pdfArr = await this.pdfService.addPdf(email, name, text);
    if (pdfArr != undefined) {
      return this.assignResult(pdfArr);
    }
    this.errorObj.name = 'Could not find user with email ' + email;
    return this.errorObj;
  }
  // rename the pdf with this id
  @Mutation(() => PdfEntity)
  async renamePDF(@Args('id') id: string, @Args('name') name: string) {
    const pdfArr = await this.pdfService.setNamePdf(id, name);

    if (pdfArr != undefined) {
      return this.assignResult(pdfArr);
    }
    return this.errorObj;
  }

  // change if true to false and if false to true and change the file appropraitely
  @Mutation(() => PdfEntity)
  async downloadedPDF(@Args('id') id: string) {
    const pdfArr = await this.pdfService.setDownloadedPdf(id);

    if (pdfArr != undefined) {
      return this.assignResult(pdfArr);
    }
    return this.errorObj;
  }

  // delete pdf with this id from DB
  @Mutation(() => PdfEntity)
  async deletePDF(@Args('id', { type: () => String }) id: string) {
    const pdfArr = await this.pdfService.deletePdf(id);

    if (pdfArr != undefined) {
      return this.assignResult(pdfArr);
    }
    return this.errorObj;
  }
}
