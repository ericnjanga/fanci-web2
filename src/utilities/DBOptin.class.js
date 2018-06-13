/**
 * Class dedicated to posts
 */ 
import { database } from './../services/firebase.js';  


const nodeName = 'opt-ins';
 


 

class DBOptin { 
  // static formFields = formFields;  

  
  /**
   * Return database node (for external use)
   */ 
  static getNode() {
    return database.ref(nodeName);
  }

  
  /**
   * Save info in the database
   * - create new record if it doesn't exist
   * - update record with new property if (record is already existing)
   */
  static save(fanciID, ownerID, participantID) { 
    const listRef_optins = database.ref(nodeName);
    let recordExists = false; //determine wheather the record is already existing in the database

    return new Promise(((resolve) => {
      //1) check if post exists in node ...
      listRef_optins.once('value', function(snapshot) {
        if (snapshot.hasChild(fanciID)) { 
          recordExists = true;
        }
      }).then(()=>{ 
        //2) if post is not existant
        //If this is a new record ...
        if(!recordExists){
          const listRef_child = database.ref(nodeName);
          let newRecord = {};
          newRecord[fanciID] = {}; 
          newRecord[fanciID].ownerID = ownerID;
          newRecord[fanciID].participants = {}; 
          newRecord[fanciID].participants[participantID] = {
            date: Date.now()
          } 
          resolve( listRef_child.update(newRecord) ); 
        } else { 
          //If post is already existing ...
          const listRef_child = database.ref(nodeName + '/' + fanciID + '/participants/' + participantID);
          let newRecord = {
            date: Date.now()
          };
          resolve( listRef_child.update(newRecord) );  
        }
      });  
    }));//[end] Promise
  }//[end] save


  /**
   * Check is logged user has "opted-in"
   * @param {*} fanciID 
   * @param {*} participantID 
   */
  static findUser(fanciID, participantID) { 
    return database.ref(nodeName + '/' + fanciID + '/participants');
    // const listRef_child = database.ref(nodeName + '/' + fanciID + '/participants/');
    // return listRef_child;
  }


  //Delete a post
  static remove(fanciID, participantID) {  
    let uri = nodeName + '/' + fanciID;
    if(participantID){
      uri += '/participants/' + participantID;
    }
    return database.ref(uri).remove();
  } 
}

export default DBOptin;

 