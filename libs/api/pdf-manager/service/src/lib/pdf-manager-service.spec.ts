import { Test } from '@nestjs/testing';
import { PdfManagerService } from './pdf-manager-service';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('PdfManagerService', () => {
  let service: PdfManagerService;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PdfManagerService, CommandBus, QueryBus],
    }).compile();

    await module.init();
    queryBus = module.get<QueryBus>(QueryBus);
    service = module.get(PdfManagerService);
  });

  
  /*it('should be defined', () => {
    expect(new PdfManagerService()).toBeDefined();
  });*/

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(queryBus).toBeDefined();
  });

  /*describe('getName', () => {
    it('should return a name of a student name', async () => {
        const result = await mockUserDataBase.handler.findFirst(userID);
        expect(result).toEqual(mockUser);
    })
  });

  describe('getEmails', () => {
    it('should return 1 or more of the student\'s emails', async () => {
      const result = await mockEmailDataBase.handler.findMany(userID);
      expect(result).toEqual(mockEmail);
    })
  });

  describe('getBio', () => {
    it('should return the student\'s bio', async () => {
      const result = await mockUserProfileDataBase.handler.findFirst(userID);
      expect(result).toEqual(mockUserProfile);
    })
  });

  describe('getTags', () => {
    it('should return the student\'s bio', async () => {
      const result = await mockTagsDataBase.handler.findMany(userID);
      expect(result).toEqual(mockTags);
    })
  });

  describe('getLocation', () => {
    it('should return the student\'s prefered location', async () => {
      const result = await mockLocationDataBase.handler.findFirst(userID);
      expect(result).toEqual(mockLocation);
    })
  });

  describe('getEmploymentStatus', () => {
    it('should return the student\'s Employment Status', async () => {
      const result = await mockUserProfileDataBase.handler.findFirst(userID);
      expect(result).toEqual(mockUserProfile);
    })
  });

  describe('getSocialMedia', () => {
    it('should return the student\'s Social Media', async () => {
      const result = await mockSocialMediaDataBase.handler.findMany(userID);
      expect(result).toEqual(mockSocialMedia);
    })
  });*/
  
});
