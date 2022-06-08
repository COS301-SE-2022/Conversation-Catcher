import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseManagerResolver } from './database-manager.resolver';
import { DatabaseManagerService } from '@conversation-catcher/api/database-manager/service/feature';

describe('DatabaseManagerResolver', () => {
  let resolver: DatabaseManagerResolver;

  const MockDBService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseManagerResolver, DatabaseManagerService],
    }).overrideProvider(DatabaseManagerService).useValue(MockDBService).compile();

    resolver = module.get<DatabaseManagerResolver>(DatabaseManagerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
