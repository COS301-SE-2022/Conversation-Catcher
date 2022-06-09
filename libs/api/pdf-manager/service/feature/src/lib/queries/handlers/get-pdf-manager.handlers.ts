import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPdfByIdQuery, GetPdfsQuery } from "../impl";

@QueryHandler(GetPdfByIdQuery)
export class GetPdfByIdHandler implements IQueryHandler<GetPdfByIdQuery> {
    //constructor(private readonly repository: Repository) {}

    async execute(query: GetPdfByIdQuery): Promise<any> {
        const {id} = query;
        //return this.repository.getName(userId);
        return null;
    }
}

@QueryHandler(GetPdfsQuery)
export class GetPdfsHandler implements IQueryHandler<GetPdfsQuery> {
    //constructor(private readonly repository: Repository) {}

    async execute(query: GetPdfsQuery): Promise<any> {
        const {userid} = query;
        //return this.repository.getDoB(userId);
        return null;
    }
}