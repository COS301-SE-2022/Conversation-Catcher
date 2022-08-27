import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  getAllGroupsQuery,
  getGroupsForQuery,
  getGroupPdfsQuery,
  getUserQuery,
} from '../impl';
import { MongoDBAccess } from '@conversation-catcher/api/user-management/repository/data-access';

@QueryHandler(getUserQuery)
export class getUserHandler implements IQueryHandler<getUserQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email }: getUserQuery): Promise<any> {
    return await this.repository.getUser(email);
  }
}

@QueryHandler(getGroupPdfsQuery)
export class getGroupPdfsHandler implements IQueryHandler<getGroupPdfsQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ group_id }: getGroupPdfsQuery): Promise<any> {
    return await this.repository.getGroupPdfs(group_id);
  }
}

@QueryHandler(getGroupsForQuery)
export class getGroupsForHandler implements IQueryHandler<getGroupsForQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute({ email }: getGroupsForQuery): Promise<any> {
    return await this.repository.getGroupsFor(email);
  }
}

@QueryHandler(getAllGroupsQuery)
export class getAllGroupsHandler implements IQueryHandler<getAllGroupsQuery> {
  constructor(private repository: MongoDBAccess) {}

  async execute(getAllGroupsQuery): Promise<any> {
    return await this.repository.getAllGroups();
  }
}
