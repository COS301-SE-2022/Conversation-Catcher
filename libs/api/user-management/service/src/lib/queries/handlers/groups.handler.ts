import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MongoDBAccess as userMongoAccess } from '@conversation-catcher/api/user-management/repository/data-access';
// import { MongoDBAccess as pdfMongoAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';
import {
  getAllGroupsQuery,
  getGroupsForQuery,
  // getGroupPdfsQuery,
} from '../impl';

// @QueryHandler(getGroupPdfsQuery)
// export class getGroupPdfsHandler implements IQueryHandler<getGroupPdfsQuery> {
//   constructor(
//     private userRepository: userMongoAccess,
//     private pdfRepository: pdfMongoAccess
//   ) {}

//   //Return all the pdfs shared to a specefic group
//   async execute({ groupName }: getGroupPdfsQuery): Promise<any> {
//     const groups = await this.userRepository.getGroups();
//     const pdfs = groups[groupName].pdfs;
//     const result = [];
//     for (const pdf of pdfs) {
//       const res = await this.pdfRepository.getPDF(pdf);
//       //clear the pdf from the group if it is not available
//       if (res !== null)
//         result.push(res);
//       else
//         groups[groupName].pdfs.splice(groups[groupName].pdfs.indexOf(pdf),1);
//     }
//     delete groups._id;
//     this.userRepository.updateGroups(groups);
//     return result;
//   }
// }

@QueryHandler(getGroupsForQuery)
export class getGroupsForHandler implements IQueryHandler<getGroupsForQuery> {
  constructor(private repository: userMongoAccess) {}

  //Get all the groups for a certain user
  async execute({ email }: getGroupsForQuery): Promise<any> {
    const user = await this.repository.getUser(email);
    const groups = await this.repository.getGroups();
    const result = [];
    if (user !== null){
      if (user.groups === undefined) user.groups = [];
      for (const group of user.groups) {
        if (groups[group] !== undefined)
          result.push(groups[group]);
      }
    }
    return result;
  }
}

@QueryHandler(getAllGroupsQuery)
export class getAllGroupsHandler implements IQueryHandler<getAllGroupsQuery> {
  constructor(private repository: userMongoAccess) {}

  async execute(getAllGroupsQuery): Promise<any> {
    const groups = await this.repository.getGroups();
    const result = [];
    Object.values(groups).forEach((group) => {
      if (group !== '63063e721460d424280125b8') result.push(group);
    });
    return result;
  }
}
