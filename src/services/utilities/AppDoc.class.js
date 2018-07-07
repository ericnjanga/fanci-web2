
class AppDoc {
  static getPathName() {

    let currPathName = document.location.pathname.replace('/', '');

    currPathName = (currPathName === '') ? 'home' : currPathName;
    return currPathName;

  }

  /**
   * Callback a function is a condition passes on any of the node in the list
   * @param {*} nodesSelector
   * @param {*} condition : define if a node is/isn't a target of the event
   * @param {*} ev
   * @param {*} callback
   */
  static actIfNodeIs(nodesSelector, condition, ev, callback) {
    const nodeList = document.querySelectorAll(nodesSelector);
    if (condition==='is targetted') {
      for (let node of nodeList) {
        if (ev.path.indexOf(node) >= 0) {
          if (typeof callback==='function') {
            callback();
          }
          break;
        } 
      } 
    }else{
      for (let node of nodeList) {
        if (ev.path.indexOf(node) === -1) {
          if (typeof callback==='function') {
            callback();
          }
          break;
        } 
      }
    } 
  }// [end] actIfNodeIs

  static getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  /**
   * Compare two JSON objects 1 level deep
   * @param {*} obj1 
   * @param {*} obj2 
   */
  static objAreEqual(obj1, obj2) {
    for(let ppt1 in obj1) {
      if (obj1.hasOwnProperty(ppt1) && obj1[ppt1]!==obj2[ppt1]) {
        return false;
      }
    }
    return true;
  } 
}


export default AppDoc;