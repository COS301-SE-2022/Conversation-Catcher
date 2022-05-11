import { Resolver, Query, Args } from '@nestjs/graphql';
import { PdfManagerEntity } from "@conversation-catcher/api/pdf-manager/api/data-access";
import { ApiPdfManagerServiceModule } from "@conversation-catcher/api/pdf-manager/service";

@Resolver(() => PdfManagerEntity)
export class PdfManagerResolver {
	constructor(private companyService: ApiPdfManagerServiceModule) {}

	@Query(() => PdfManagerEntity)
	async getPDFs() {
		const pdfs = new Array<PdfManagerEntity>();

		return pdfs;
	}
}
