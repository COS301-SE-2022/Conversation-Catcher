import { Resolver, Args, Mutation } from '@nestjs/graphql';
// import { /*Query,*/  } from '@nestjs/graphql';
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

    @Mutation(()=>String)
    async Summarise(@Args('text') text: string) {
      console.log('Service called')
        return await this.service.Summarise(text);
    }
}
