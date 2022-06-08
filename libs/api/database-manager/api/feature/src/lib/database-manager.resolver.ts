import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';
import { DatabaseManagerService } from '@conversation-catcher/api/database-manager/service/feature';
import { tap, map } from 'rxjs';

@Resolver()
export class DatabaseManagerResolver {
  constructor(private dbService: DatabaseManagerService) {}

  @Query(() => String, { name: 'test' })
  async pingStudentProfiles() {
    const a = await this.dbService.getResult();
    console.log(a);
    return 'on';
  }
}
