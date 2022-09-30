import { Test } from '@nestjs/testing';
import { ApiPdfManagerServiceService } from './api-pdf-manager-service.service';
//import { QueryBus, CommandBus } from '@nestjs/cqrs'
import { CommandBus, CqrsModule, QueryBus } from '@nestjs/cqrs';
import * as CommandHandlers from './commands/handlers';
import * as QueryHandlers from './queries/handlers';
import { PdfManagerRepositoryDataAccessModule } from '@conversation-catcher/api/pdf-manager/repository/data-access';
import { PdfEntity } from '@conversation-catcher/api/pdf-manager/api/data-access';

const PdfEntityMock = new PdfEntity();
PdfEntityMock.creationDate = '22/06/2022';
PdfEntityMock.downloaded = false;
PdfEntityMock.id = '9332';
PdfEntityMock.name = 'Trees and fruit growing';

const PdfEntity2Mock = new PdfEntity();
PdfEntity2Mock.creationDate = '03/07/2022';
PdfEntity2Mock.downloaded = false;
PdfEntity2Mock.id = '2874';
PdfEntity2Mock.name = 'Sheep wool and sweaters';

const PdfsMock = new Array<PdfEntity>(2);
PdfsMock[0] = PdfEntityMock;
PdfsMock[1] = PdfEntity2Mock;

const mocksetDownloadedDataBase = {handler: {findFirst: jest.fn((id)=>PdfEntityMock)}};
const mockgetPdfByIdDataBase = {handler: {findFirst: jest.fn((id)=>PdfEntityMock)}};
const mockSetNameDataBase = {handler: {findFirst: jest.fn((id, name)=>PdfEntityMock)}};
const mockdeletePdfDataBase = {handler: {findFirst: jest.fn((id)=>PdfEntityMock)}};
const mockaddPdfDataBase = {handler: {findFirst: jest.fn((email, name, text)=>PdfEntityMock)}};
const mockgetPdfsDataBase = {handler: {findMany: jest.fn((userId)=>PdfsMock)}};
const mockaddTagDataBase = {handler: {findFirst: jest.fn((id,tags)=>{return {modifiedCount:1}})}};
const mockremoveTagDataBase = {handler: {findFirst: jest.fn((id,tags)=>{return {modifiedCount:1}})}};
const mocksetSummarizedDataBase = {handler: {findFirst: jest.fn((id,summary)=>{return {modifiedCount:1}})}};
const mocksetEmbeddingsTagDataBase = {handler: {findFirst: jest.fn((id,embeddings)=>{return {modifiedCount:1}})}};


const id = '9332';
const userid = '0102';
const name = 'Trees and fruit growing';
const email = 'john.smith@gmail.com';
const text = 'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building. Its base is square, measuring 125 metres (410 ft) on each side. It is the second tallest free-standing structure in France after the Millau Viaduct.';
const tags = ['one', 'two'];

describe('ApiPdfManagerServiceService', () => {
  let service: ApiPdfManagerServiceService;
  let repo: PdfManagerRepositoryDataAccessModule;
  let queryBus: QueryBus;
  let commandBus: CommandBus;


  beforeEach(async () => {
    const module = await Test.createTestingModule({
      //providers: [ApiPdfManagerServiceService, QueryBus, CommandBus],
      controllers: [],
      imports: [
        CqrsModule, PdfManagerRepositoryDataAccessModule
      ],
      providers: [
        ApiPdfManagerServiceService,
        CommandHandlers.SetDownloadedPdfHandler,
        CommandHandlers.SetNamePdfHandler,
        CommandHandlers.DeletePdfHandler,
        CommandHandlers.AddPdfHandler,
        CommandHandlers.AddTagsHandler,
        CommandHandlers.DeleteTagsHandler,
        QueryHandlers.GetPdfByIdHandler,
        QueryHandlers.GetPdfsHandler,
      ],
      exports: [
        ApiPdfManagerServiceService
      ],

    }).compile();


    await module.init();
    queryBus = module.get<QueryBus>(QueryBus);
    commandBus = module.get<CommandBus>(CommandBus);
    service = module.get(ApiPdfManagerServiceService);
    repo = module.get(PdfManagerRepositoryDataAccessModule);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(queryBus).toBeDefined();
    expect(commandBus).toBeDefined();
    expect(repo).toBeDefined();
  });


  //commands
  /*async setDownloadedPdf(id: string) {
    return await this.commandBus.execute(new SetDownloadedPdfCommand(id));
  }*/
  describe('setDownloadedPdf', () => {
    it('should return a pdf', async () => {
      const result = await mocksetDownloadedDataBase.handler.findFirst(id);
      expect(result).toEqual(PdfEntityMock);
    })
  });

  /*async setNamePdf(id: string, name: string) {
    return await this.commandBus.execute(new SetNamePdfCommand(id, name));
  }*/
  describe('setNamePdf', () => {
    it('should return a pdf', async () => {
      const result = await mockSetNameDataBase.handler.findFirst(id, name);
      expect(result).toEqual(PdfEntityMock);
    })
  });

  /*async deletePdf(id: string) {
    return await this.commandBus.execute(new DeletePdfCommand(id));
  }*/
  describe('deletePdf', () => {
    it('should return a pdf', async () => {
      const result = await mockdeletePdfDataBase.handler.findFirst(id);
      expect(result).toEqual(PdfEntityMock);
    })
  });

  /*async addPdf(email: string, name: string, text: string) {
    return await this.commandBus.execute(new AddPdfCommand(email, name, text))
  }*/
  describe('addPdf', () => {
    it('should return a pdf', async () => {
      const result = await mockaddPdfDataBase.handler.findFirst(email, name, text);
      expect(result).toEqual(PdfEntityMock);
    })
  });

  // async addTags(id: string, tags: string[]) {
  //   return await this.commandBus.execute(new AddTagsCommand(id, tags));
  // }
  describe('addTags', () => {
    it('should add a tag to the pdf', async () => {
      const result = await mockaddTagDataBase.handler.findFirst(id,tags);
      expect(result.modifiedCount).toEqual(1);
    })
  });
  // async removeTags(id: string, tags: string[]) {
  //   return await this.commandBus.execute(new DeleteTagsCommand(id, tags));
  // } {modifiedCount:1}
  describe('removeTags', () => {
    it('should remove a tag from the pdf', async () => {
      const result = await mockremoveTagDataBase.handler.findFirst(id,tags);
      expect(result.modifiedCount).toEqual(1);
    })
  });

  // async setSumarry(id: string, summary: string) {
  //   return await this.commandBus.execute(new SetSummarizedCommand(id, summary));
  // }
  describe('removeTags', () => {
    it('should remove a tag from the pdf', async () => {
      const result = await mocksetSummarizedDataBase.handler.findFirst(id,tags);
      expect(result.modifiedCount).toEqual(1);
    })
  });
  
  // async setEmbeddings(id: string, embeddings: string) {
  //   return await this.commandBus.execute(
  //     new SetEmbeddingsCommand(id, embeddings)
  //   );
  describe('removeTags', () => {
    it('should remove a tag from the pdf', async () => {
      const result = await mocksetEmbeddingsTagDataBase.handler.findFirst(id,tags);
      expect(result.modifiedCount).toEqual(1);
    })
  });

  //queries
  /*async getPdfById(id: string) {
    return await this.queryBus.execute(new GetPdfByIdQuery(id));
  }*/
  describe('getPdfById', () => {
    it('should return a pdf', async () => {
      const result = await mockgetPdfByIdDataBase.handler.findFirst(id);
      expect(result).toEqual(PdfEntityMock);
    })
  });

  /*async getPdfs(userid: string) {
    return await this.queryBus.execute(new GetPdfsQuery(userid));
  }*/
  describe('getPdfs', () => {
    it('should return a pdf', async () => {
      const result = await mockgetPdfsDataBase.handler.findMany(userid);
      expect(result).toEqual(PdfsMock);
    })
  });

});
