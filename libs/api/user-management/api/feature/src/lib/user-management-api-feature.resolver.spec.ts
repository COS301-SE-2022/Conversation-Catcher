import { Test, TestingModule } from '@nestjs/testing';
import { UserManagementApiFeatureResolver } from './user-management-api-feature.resolver';
import { UserManagementServiceModule } from "@conversation-catcher/api/user-management/service";
import { CqrsModule } from '@nestjs/cqrs';
//yarn nx run api-authentication-api-feature:test
describe('UserManagementFeatureResolver', () => {
  let resolver: UserManagementApiFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        CqrsModule,
        UserManagementServiceModule,
      ],
      providers: [
        UserManagementApiFeatureResolver,
      ],
    }).compile();

    resolver = module.get<UserManagementApiFeatureResolver>(
      UserManagementApiFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
