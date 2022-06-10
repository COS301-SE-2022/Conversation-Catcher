import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DatabaseManagerService } from '@conversation-catcher/api/database-manager/service/feature';

@Resolver()
export class DatabaseManagerResolver {
  constructor(private dbService: DatabaseManagerService) {}

  @Query(() => String)
  async addUser() {
    const a = await this.dbService.addUser('John@test');
    console.log(a);
    return 'on';
  }

  @Query(() => String)
  async addPDF() {
    const a = await this.dbService.addPDF('id', 'name', 'path');
    console.log(a);
    return 'on';
    /*** id: string
     * name: string
     * path: string
     * creationDate: Date
     * dowloaded: boolean */
  }

  @Mutation(() => String)
  async renamePDF(@Args('id', { type: () => String }) id: string, @Args('name', { type: () => String }) name: string) {
    const a = await this.dbService.renamePDF(id,name);
    console.log(a);
    return 'on';
  }

  @Query(() => String)
  async getAllPdfs() {
    const a = await this.dbService.getAllPdfs('John@test');
    console.log(a);
    return 'success';
  }
}
