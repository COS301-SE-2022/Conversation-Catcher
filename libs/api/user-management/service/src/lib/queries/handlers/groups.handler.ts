import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MongoDBAccess as userMongoAccess } from '@conversation-catcher/api/user-management/repository/data-access';
import { MongoDBAccess as pdfMongoAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
import {
  getAllGroupsQuery,
  getGroupsForQuery,
  getGroupPdfsQuery,
} from '../impl';

@QueryHandler(getGroupPdfsQuery)
export class getGroupPdfsHandler implements IQueryHandler<getGroupPdfsQuery> {
  constructor(
    private userRepository: userMongoAccess,
    private pdfRepository: pdfMongoAccess
  ) {}

  //Return all the pdfs shared to a specefic group
  async execute({ groupName }: getGroupPdfsQuery): Promise<any> {
    const groups = await this.userRepository.getGroups();
    const pdfs = groups[groupName].pdfs;
    const result = [];
    for (const pdf of pdfs) {
      result.push(await this.pdfRepository.getPDF(pdf));
    }
    console.log(result);
    return result;
  }
}

@QueryHandler(getGroupsForQuery)
export class getGroupsForHandler implements IQueryHandler<getGroupsForQuery> {
  constructor(private repository: userMongoAccess) {}

  //Get all the groups for a certain user
  async execute({ email }: getGroupsForQuery): Promise<any> {
    const user = await this.repository.getUser(email);
    const groups = await this.repository.getGroups();
    const result = [];
    for (const group of user.groups) {
      result.push(groups[group]);
    }
    console.log(result);
    return result;
  }
}

@QueryHandler(getAllGroupsQuery)
export class getAllGroupsHandler implements IQueryHandler<getAllGroupsQuery> {
  constructor(private repository: userMongoAccess) {}

  async execute(getAllGroupsQuery): Promise<any> {
    return 'not implemented';
  }
}
