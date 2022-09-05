import { Test, TestingModule } from '@nestjs/testing';
import { ApiSummariseTextApiResolver } from './api-summarise-text-api.resolver';
import { ApiSummariseTextServiceModule } from "@conversation-catcher/api/summarise-text/service";
//yarn nx run api-summarise-text-api:test

const summaryMock = 'Summary';

describe('ApiSummariseTextApiResolver', () => {
  let resolver: ApiSummariseTextApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiSummariseTextApiResolver,
      ],
      exports: [ApiSummariseTextApiResolver],
      imports: [ApiSummariseTextServiceModule]
    }).compile();

    resolver = module.get<ApiSummariseTextApiResolver>(
      ApiSummariseTextApiResolver
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  
  /**
  * Test the addPDF method
  * text to summarise
  */
  describe('Summarise', () => {
    const result = [String];
    const input = 'The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.';
    
    it('should return a string', async () => {
    jest
      .spyOn(resolver, 'Summarise')
      .mockImplementation((): Promise<StringConstructor[]> => Promise.resolve(result));

      expect(await resolver.Summarise(input)).toMatchObject(summaryMock);
    });
    it('should return null', async () => {
      jest.spyOn(resolver, 'Summarise').mockResolvedValue(null);
    
      expect(await resolver.Summarise(input)).toEqual(null);
    });
  });
});
