import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { logInQuery } from '../impl';
//import { MongoDBAccess } from '@conversation-catcher/api/pdf-manager/repository/data-access';

@QueryHandler(logInQuery)
export class logInHandler implements IQueryHandler<logInQuery> {
  //constructor(private repository: MongoDBAccess) {}

  async execute({ user }: logInQuery): Promise<any> {
    //console.log('Calling query for pdfByID');
    // return await this.repository.getPDF(id);
  }
}