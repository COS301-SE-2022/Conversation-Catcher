import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApiDatabaseManagerApiFeatureModule as DatabaseManager } from '@conversation-catcher/api/database-manager/api/feature';
import { ApiStudentExploreApiFeatureModule as PdfManager } from '@conversation-catcher/api/pdf-manager/api/feature';

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
    // PdfManager,
  ],
})
export class ApiShellModule {}
