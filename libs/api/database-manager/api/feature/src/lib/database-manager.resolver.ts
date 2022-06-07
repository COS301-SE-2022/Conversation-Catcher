import { Query, Args, Resolver, Mutation } from '@nestjs/graphql';

@Resolver()
export class DatabaseManagerResolver {
  @Query(() => String)
  pingStudentProfiles() {
    return 'on';
  }
}
