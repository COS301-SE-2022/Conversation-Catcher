import { Test, TestingModule } from '@nestjs/testing';
import { PdfEntity } from './api-pdf.entity';

describe('ApiStudentProfilesEntity', () => {
  it('should be defined', () => {
    expect(new PdfEntity()).toBeDefined();
  });
});