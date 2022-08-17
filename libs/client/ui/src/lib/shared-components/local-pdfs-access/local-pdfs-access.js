class LocalPdfsAccess {
  pdfs;
  constructor() {
    this.pdfs = [];
  }

  addPdfs(newPdfs) {
    for (let i = 0; i < newPdfs.length; i++) {
      this.pdfs.push(newPdfs[i]);
    }
  }

  addPdf(newPdf) {
    this.pdfs.push(newPdf);
  }

  getPdfs() {
    return this.pdfs;
  }

  getLength() {
    if (this.pdfs[0] === undefined) return 0;
    return this.pdfs.length;
  }

  get(i) {
    return this.pdfs[i];
  }

  clearPdfs() {
    this.pdfs.length = 0;
  }
}

const pdfLocalAccess = new LocalPdfsAccess();
Object.freeze(pdfLocalAccess);

export default pdfLocalAccess;
