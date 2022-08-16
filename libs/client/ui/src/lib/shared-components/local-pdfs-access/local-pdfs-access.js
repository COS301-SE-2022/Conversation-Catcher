export class LocalPdfsAccess {
  pdfs;
  constructor() {
    this.pdfs = [];
  }

  addPdfs(newPdfs) {
    for (let i = 0; i < newPdfs.length; i++) {
      this.pdfs.push(newPdfs[i]);
    }
  }

  addPds(newPdf) {
    this.pdfs.push(newPdf);
  }

  getPdfs() {
    return this.pdfs;
  }

  hasPdfs() {
    if (this.pdfs[0] === undefined) return false;
    return true;
  }
}
export default LocalPdfsAccess;
