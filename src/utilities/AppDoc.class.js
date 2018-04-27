
class AppDoc {
  static getPathName(){
    let currPathName = document.location.pathname.replace('/','');
    currPathName = (currPathName==='')?'home':currPathName;

    console.log('>>>>>currPathName=', currPathName);

    return currPathName;
  }
}

export default AppDoc;