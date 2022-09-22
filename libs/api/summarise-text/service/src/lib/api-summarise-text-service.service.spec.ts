import { Test, TestingModule } from '@nestjs/testing';
import { ApiSummariseTextServiceService } from './api-summarise-text-service.service';
import { QueryBus, CommandBus } from '@nestjs/cqrs'
import { CqrsModule } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import { HttpModule } from '@nestjs/axios';
//yarn nx run api-summarise-text-service:test

describe('ApiSummariseTextServiceService', () => {
  let service: ApiSummariseTextServiceService;
  let queryBus: QueryBus;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // providers: [
      //   ApiSummariseTextServiceService,
      //   QueryBus,
      //   CommandBus,
      //   ];
      imports: [
        CqrsModule,
        HttpModule,
      ],
      providers: [
        ApiSummariseTextServiceService,
        CommandHandlers.SummariesHandler,
      ],
      exports: [
        ApiSummariseTextServiceService,
      ],
    }).compile();


    await module.init();
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
    service = module.get<ApiSummariseTextServiceService>(
      ApiSummariseTextServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(queryBus).toBeDefined();
    expect(commandBus).toBeDefined();
  });
});
