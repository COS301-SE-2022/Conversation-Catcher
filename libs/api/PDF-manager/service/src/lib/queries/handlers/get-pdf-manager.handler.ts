import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPdfByIdQuery, GetPdfsQuery } from "../impl";

@QueryHandler(GetPdfByIdQuery)
export class GetPdfByIdHandler implements IQueryHandler<GetPdfByIdQuery> {
    //constructor() {}
    //constructor(private readonly repository: StudentProfilesRepository) {}

    async execute(query: GetPdfByIdQuery): Promise<any> {
        const {id} = query;
        //return this.repository.getName(userId);
    }
}

@QueryHandler(GetPdfsQuery)
export class GetPdfsQueryHandler implements IQueryHandler<GetPdfsQuery> {
    //constructor() {}
    //constructor(private readonly repository: StudentProfilesRepository) {}

    async execute(query: GetPdfsQuery): Promise<any> {
        const {userId} = query;
        //return this.repository.getDoB(userId);
    }
}