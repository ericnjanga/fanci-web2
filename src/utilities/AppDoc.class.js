
class AppDoc {
  static getPathName(){
    let currPathName = document.location.pathname.replace('/','');
    currPathName = (currPathName==='')?'home':currPathName; 
    return currPathName;
  }
}

export default AppDoc;