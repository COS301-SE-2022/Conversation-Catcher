import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { DatabaseManagerService } from '@conversation-catcher/api/database-manager/service/feature';
import { tap, map } from 'rxjs';

@Resolver()
export class DatabaseManagerResolver {
  constructor(private dbService: DatabaseManagerService) {}

  @Query(() => String)
  async addUser() {
    const a = await this.dbService.AddUser('John@test');
    console.log(a);
    return 'on';
  }

  @Query(() => String)
  async addPDF() {
    const a = await this.dbService.AddPDF('id', 'name', 'path');
    console.log(a);
    return 'on';
    /*** id: string
     * name: string
     * path: string
     * creationDate: Date
     * dowloaded: boolean */
  }
}
