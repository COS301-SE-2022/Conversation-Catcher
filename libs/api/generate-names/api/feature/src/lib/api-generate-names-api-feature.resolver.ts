import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ApiGenerateNamesServiceService } from '@conversation-catcher/api/generate-names/service';

@Resolver()
export class ApiGenerateNamesApiFeatureResolver {
  constructor(private generateNameService: ApiGenerateNamesServiceService) {}

  //Function to call and expose the generate name service
  @Mutation(() => String)
  async generateName(@Args('text') text: string) {
    return await this.generateNameService.generateName(text);
  }
}
