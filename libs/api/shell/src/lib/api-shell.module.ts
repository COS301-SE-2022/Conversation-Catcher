import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApiStudentExploreApiFeatureModule as PdfManager } from '@conversation-catcher/api/pdf-manager/api/feature';
import { ApiSummariseTextApiModule as Summariser} from '@conversation-catcher/api/summarise-text/api'
import { ApiSpeechToTextApiModule as SpeechToText } from '@conversation-catcher/api/speech-to-text/api';
import { UserManagementApiFeatureModule as UserManagement } from '@conversation-catcher/api/user-management/api/feature'
import { ApiGenerateNamesApiFeatureModule as NameGeneration } from '@conversation-catcher/api/generate-names/api/feature'


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
    PdfManager,
    Summariser,
    SpeechToText,
    UserManagement,
    NameGeneration,
  ],
})
export class ApiShellModule {}
