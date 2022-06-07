import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseManagerResolver } from './database-manager.resolver';

describe('DatabaseManagerResolver', () => {
  let resolver: DatabaseManagerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseManagerResolver],
    }).compile();

    resolver = module.get<DatabaseManagerResolver>(DatabaseManagerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
