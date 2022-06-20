import { MongoDBAccess } from './mongodb-access';

describe('MongoAccess', () => {
  it('should be defined', () => {
    expect(new MongoDBAccess()).toBeDefined();
  });
});
