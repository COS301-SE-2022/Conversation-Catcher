class LocalGroupsAccess {
  displayGroups; //The groups that get displayed
  allGroups; //All the groups loaded from the api call

  constructor() {
    this.displayGroups = [];
    this.allGroups = [];
  }

  //Add shallow copy of an array of groups into both arrays
  addGroups(newGroups) {
    for (let i = 0; i < newGroups.length; i++) {
      this.displayGroups.push(newGroups[i]);
      this.allGroups.push(newGroups[i]);
    }
  }

  //Add shallow copy of group into both arrays
  addGroup(newGroup) {
    this.displayGroups.push(newGroup);
    this.allGroups.push(newGroup);
  }

  //Return groups to be displayed by the component
  getGroups() {
    return this.displayGroups;
  }

  //Return the size of the displayGroups array
  getLength() {
    if (this.displayGroups[0] === undefined) return 0;
    return this.displayGroups.length;
  }

  //Return a specefic element of the group
  // get(i) {
  //   return this.displayGroups[i];
  // }

  //Resets both arrays of groups to be empty
  clearGroups() {
    this.displayGroups.length = 0;
    this.allGroups.length = 0;
  }

  //Filter the displayGroups on name to display groups based on given search criteria
  filterGroups(text) {
    this.displayGroups.length = 0;
    for (let i = 0; i < this.allGroups.length; i++) {
      if (this.allGroups[i].name.indexOf(text) !== -1)
        this.displayGroups.push(this.allGroups[i]);
    }
  }

  sortGroups(sortBy) {
    // Sort PDFs array according to sortBy (Which is either Name or )
    switch (sortBy) {
      case 'Name':
        this.displayGroups.sort((a, b) => {
          if (a.name < b.name) return -1;
          return 1;
        });
        console.log(this.displayGroups);
        break;
      case 'Date':
        this.displayGroups.sort((a, b) => {
          if (new Date(a.creationDate) > new Date(b.creationDate)) return -1;
          return 1;
        });
        console.log(this.displayGroups);
        break;
    }
  }

  //Search for group with id groupId and change the name
  renameGroup(groupId, newName) {
    for (let i = 0; i < this.allGroups.length; i++) {
      if (this.allGroups[i].id === groupId) this.allGroups[i].name = newName;
    }
  }

  //Remove group with certain id from the list
  deleteGroup(groupId) {
    var temp = [];
    for (let i = 0; i < this.allGroups.length; i++) {
      if (this.allGroups[i].id !== groupId) temp.push(this.allGroups[i]);
    }
    this.clearGroups();
    this.addGroups(temp);
  }
}

const groupLocalAccess = new LocalGroupsAccess();
Object.freeze(groupLocalAccess);
export default groupLocalAccess;
