class LocalPdfsAccess {
  displayPdfs; //The pdfs that get displayed
  allPdfs; //All the pdfs loaded from the api call

  constructor() {
    this.displayPdfs = [];
    this.allPdfs = [];
  }

  //Add shallow copy of an array of pdfs into both arrays
  addPdfs(newPdfs) {
    for (let i = 0; i < newPdfs.length; i++) {
      this.displayPdfs.push(newPdfs[i]);
      this.allPdfs.push(newPdfs[i]);
    }
  }

  //Add shallow copy of pdf into both arrays
  addPdf(newPdf) {
    this.displayPdfs.push(newPdf);
    this.allPdfs.push(newPdf);
  }

  //Return pdfs to be displayed by the component
  getPdfs() {
    return this.displayPdfs;
  }

  getPdfIds() {
    const id_array = [];
    this.allPdfs.forEach((pdf) => {
      id_array.push(pdf.id);
    });
    return id_array;
  }

  //Return the size of the displayPdfs array
  getLength() {
    if (this.displayPdfs[0] === undefined) return 0;
    return this.displayPdfs.length;
  }

  //Return a specefic element of the pdf
  // get(i) {
  //   return this.displayPdfs[i];
  // }

  //Resets both arrays of pdfs to be empty
  clearPdfs() {
    this.displayPdfs.length = 0;
    this.allPdfs.length = 0;
  }

  //Filter the displayPdfs on name to display pdfs based on given search criteria
  filterPdfs(text) {
    this.displayPdfs.length = 0;
    for (let i = 0; i < this.allPdfs.length; i++) {
      if (this.allPdfs[i].name.indexOf(text) !== -1)
        this.displayPdfs.push(this.allPdfs[i]);
    }
  }

  sortPdfs(sortBy) {
    // Sort PDFs array according to sortBy (Which is either Name or )
    switch (sortBy) {
      case 'Name':
        this.displayPdfs.sort((a, b) => {
          if (a.name < b.name) return -1;
          return 1;
        });
        console.log(this.displayPdfs);
        break;
      case 'Date':
        this.displayPdfs.sort((a, b) => {
          if (new Date(a.creationDate) > new Date(b.creationDate)) return -1;
          return 1;
        });
        console.log(this.displayPdfs);
        break;
    }
  }

  //Search for pdf with id pdfId and change the name
  renamePdf(pdfId, newName) {
    for (let i = 0; i < this.allPdfs.length; i++) {
      if (this.allPdfs[i].id === pdfId) this.allPdfs[i].name = newName;
    }
  }

  //Remove pdf with certain id from the list
  deletePdf(pdfId) {
    var temp = [];
    for (let i = 0; i < this.allPdfs.length; i++) {
      if (this.allPdfs[i].id !== pdfId) temp.push(this.allPdfs[i]);
    }
    this.clearPdfs();
    this.addPdfs(temp);
  }
}

const pdfLocalAccess = new LocalPdfsAccess();
Object.freeze(pdfLocalAccess);
export default pdfLocalAccess;
