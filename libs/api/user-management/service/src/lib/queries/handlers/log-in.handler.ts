import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { logInQuery } from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/user-management/repository/data-access';

@QueryHandler(logInQuery)
export class logInHandler implements IQueryHandler<logInQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email }: logInQuery): Promise<any> {
    return await this.repository.logIn(email);
  }
}
