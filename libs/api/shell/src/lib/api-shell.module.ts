import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApiDatabaseManagerApiFeatureModule as DatabaseManager } from '@conversation-catcher/api/database-manager/api/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver,
      playground: true,
    }),
    DatabaseManager,
  ],
})
export class ApiShellModule {}
