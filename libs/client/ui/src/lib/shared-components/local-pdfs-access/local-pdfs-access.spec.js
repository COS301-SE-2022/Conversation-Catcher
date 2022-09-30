import LocalPdfsAccess from './local-pdfs-access';
describe('LocalPdfsAccess', () => {
  it('should be created successfully', () => {
    LocalPdfsAccess.addPdf({ name: 'Ben' });
    expect(LocalPdfsAccess.getLength()).toEqual(1);
  });
});
