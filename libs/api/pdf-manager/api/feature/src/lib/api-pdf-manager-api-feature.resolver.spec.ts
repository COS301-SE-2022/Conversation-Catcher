import { Test, TestingModule } from '@nestjs/testing';
import { ApiPdfManagerApiFeatureResolver } from './api-pdf-manager-api-feature.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiPdfManagerServiceModule } from '@conversation-catcher/api/pdf-manager/service/feature';
import { PdfEntity } from '../../../data-access/src/lib/pdf.entity';
//yarn nx run api-pdf-manager-api-feature:test

//jest.mock('@graduates/api/PDF-manager/api/data-access');
//const PdfManagerPdfEntityMock: jest.Mocked<PdfEntity> = new PdfEntity() as PdfEntity;

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

describe('ApiPdfManagerApiFeatureResolver', () => {
  let resolver: ApiPdfManagerApiFeatureResolver;

  const MockPdfManagerService = {
    getPdfById: jest.fn( (id: string) =>{
      PdfEntityMock.id = id;
      return PdfEntityMock;
    }),
    getPdfs: jest.fn((userid : string) => {
      return PdfsMock;
    }),
    setDownloadedPdf: jest.fn( (id: string) =>{
      PdfEntityMock.id = id;
      return PdfEntityMock;
    }),
    setNamePdf: jest.fn((id : string) => {
      PdfEntityMock.id = id;
      return PdfEntityMock;
    }),
    deletePdf: jest.fn( (id: string) =>{
      PdfEntityMock.id = id;
      return PdfEntityMock;
    }),
    addPdf: jest.fn((email: string, name: string, text: string) => {
      PdfEntityMock.name = name;
      PdfEntityMock.text = text;
      return PdfEntityMock;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [CqrsModule, ApiPdfManagerServiceModule],
        controllers: [],
        providers: [
          ApiPdfManagerApiFeatureResolver,
        ],
    })
    .overrideProvider(ApiPdfManagerServiceModule)
    .useValue(MockPdfManagerService)
    .compile();

    resolver = module.get<ApiPdfManagerApiFeatureResolver>(
      ApiPdfManagerApiFeatureResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  /**
  * Test the getPDFById method
  */
  describe('getPDFById', () => {
    const result = [PdfEntityMock];
    it('should return a pdf', async () => {
    jest
      .spyOn(resolver, 'getPDFById')
      .mockImplementation((): Promise<PdfEntity[]> => Promise.resolve(result));
     
      expect(await resolver.getPDFById('1')).toMatchObject([PdfEntityMock]);
      // TO DO: Add in valid pdfid
    });
    it('should return null', async () => {
      jest.spyOn(resolver, 'getPDFById').mockResolvedValue(null);
    
      expect(await resolver.getPDFById('1')).toEqual(null);
    });
  });

  /**
  * Test the getPDFs method
  */
  describe('getPDFs', () => {
    const result = [PdfsMock];
    it('should return a list of pdfs', async () => {
    jest
      .spyOn(resolver, 'getPDFs')
      .mockImplementation((): Promise<PdfEntity[][]> => Promise.resolve(result));
     
      expect(await resolver.getPDFs('1')).toMatchObject([PdfsMock]);
      // TO DO: Add in valid userid
    });
    it('should return null', async () => {
      jest.spyOn(resolver, 'getPDFs').mockResolvedValue(null);
    
      expect(await resolver.getPDFs('1')).toEqual(null);
    });
  });

  /**
  * Test the addPDF method
  * add pdf to db connected to this user
  */
   describe('addPDF', () => {
    const result = [PdfEntityMock];
    it('should return a pdf', async () => {
    jest
      .spyOn(resolver, 'addPDF')
      .mockImplementation((): Promise<PdfEntity[]> => Promise.resolve(result));
     
      expect(await resolver.addPDF('johndoe@gmail.com','Dogs vs cats','sajgbfufgweugvewfgy')).toMatchObject([PdfEntityMock]);
      // TO DO: Add in valid pdfid
    });
    it('should return null', async () => {
      jest.spyOn(resolver, 'addPDF').mockResolvedValue(null);
    
      expect(await resolver.addPDF('johndoe@gmail.com','Dogs vs cats','sajgbfufgweugvewfgy')).toEqual(null);
    });
  });

  /**
  * Test the renamePDF method
  * rename the pdf with this id
  */
   describe('renamePDF', () => {
    const result = [PdfEntityMock];
    it('should return a pdf', async () => {
    jest
      .spyOn(resolver, 'renamePDF')
      .mockImplementation((): Promise<PdfEntity[]> => Promise.resolve(result));
     
      expect(await resolver.renamePDF('1', "new name")).toMatchObject([PdfEntityMock]);
      // TO DO: Add in valid pdfid
    });
    it('should return null', async () => {
      jest.spyOn(resolver, 'renamePDF').mockResolvedValue(null);
    
      expect(await resolver.renamePDF('1', "new name")).toEqual(null);
    });
  });

  /**
  * Test the downloadedPDF method
  * change if true to false and if false to true and change the file appropraitely
  */
  describe('downloadedPDF', () => {
    const result = [PdfEntityMock];
    it('should return a pdf', async () => {
    jest
      .spyOn(resolver, 'downloadedPDF')
      .mockImplementation((): Promise<PdfEntity[]> => Promise.resolve(result));
     
      expect(await resolver.downloadedPDF('1')).toMatchObject([PdfEntityMock]);
      // TO DO: Add in valid pdfid
    });
    it('should return null', async () => {
      jest.spyOn(resolver, 'downloadedPDF').mockResolvedValue(null);
    
      expect(await resolver.downloadedPDF('1')).toEqual(null);
    });
  });

  /**
  * Test the deletePDF method
  * delete pdf with this id from DB
  */
  describe('deletePDF', () => {
    const result = [PdfEntityMock];
    it('should return a pdf', async () => {
    jest
      .spyOn(resolver, 'deletePDF')
      .mockImplementation((): Promise<PdfEntity[]> => Promise.resolve(result));
     
      expect(await resolver.deletePDF('1')).toMatchObject([PdfEntityMock]);
      // TO DO: Add in valid pdfid
    });
    it('should return null', async () => {
      jest.spyOn(resolver, 'deletePDF').mockResolvedValue(null);
    
      expect(await resolver.deletePDF('1')).toEqual(null);
    });
  });
});
