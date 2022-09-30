import { Test } from '@nestjs/testing';
import { UserEntity } from './user.entity';

describe('UserEntity', () => {
  it('should be defined', () => {
    expect(new UserEntity()).toBeDefined();
  });
});
