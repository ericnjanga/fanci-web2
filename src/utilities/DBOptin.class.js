/**
 * Class dedicated to posts
 */ 
import { database } from './../services/connection-details.js'; 


const nodeName = 'subscriptions';


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
   * - Create new record if it doesn't exist
   * - Update record with new property if (record is already existing)
   */
  static save(fanciID, ownerID, participantID) {

    const listRefOptins = database.ref(nodeName);
    let recordExists = false; // Determine wheather the record is already existing in the database

    return new Promise(((resolve) => {

      // 1) check if post exists in node ...
      listRefOptins.once('value', (snapshot) => {

        if (snapshot.hasChild(fanciID)) {

          recordExists = true;

        }

      }).then(() => {

        // 2) if post is not existant, create a new record ...
        if (!recordExists) {

          const listRefChild = database.ref(nodeName);
          const newRecord = {};
          newRecord[fanciID] = {};
          newRecord[fanciID].ownerID = ownerID;
          newRecord[fanciID].subscribers = {};
          newRecord[fanciID].subscribers[participantID] = {
            date: Date.now(),
          };

          resolve(listRefChild.update(newRecord));

        } else {

          // If post is already existing ...
          // nodeName + '/' + fanciID + '/subscribers/' + participantID
          const listRefChild = database.ref(`${nodeName}/${fanciID}/subscribers/${participantID}`);
          const newRecord = {
            date: Date.now(),
          };

          resolve(listRefChild.update(newRecord));
        }

      });
    }));// [end] Promise
  }// [end] save


  /**
   * Check is logged user has "opted-in"
   * @param {*} fanciID
   */
  static findUser(fanciID) {

    return database.ref(`${nodeName}/${fanciID}/subscribers`);

  }


  // Delete a post
  static remove(fanciID, participantID) {

    let uri = `${nodeName}/${fanciID}`;
    if (participantID) {

      uri += `/subscribers/${participantID}`;

    }
    return database.ref(uri).remove();
  } 
}

export default DBOptin;
