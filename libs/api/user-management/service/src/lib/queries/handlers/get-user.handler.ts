import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getUserQuery } from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/user-management/repository/data-access';

@QueryHandler(getUserQuery)
export class getUserHandler implements IQueryHandler<getUserQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email }: getUserQuery): Promise<any> {
    return await this.repository.getUser(email);
  }
}
