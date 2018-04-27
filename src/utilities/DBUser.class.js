/**
 * Class dedicated to users
 */
import firebase from './../services/firebase.js';


class DBUser { 
  //Get a user from the database ...
  //(returns a promise which resolves when the snapshot is ready) 
  static get(uid) { 
    return new Promise((resolve, reject) => {
      firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
        resolve(snapshot.val()); 
      });
    }); 
  }

  //Returns a subset (user properties) of an object's properties (object containing many more properties). 
  //https://stackoverflow.com/questions/17781472/how-to-get-a-subset-of-a-javascript-objects-properties 
  static getBasicProperties(data) {
    const properties = (({
      displayName, email, phoneNumber, photoURL, biography, visible, uid 
    }) => ({
      displayName, email, phoneNumber, photoURL, biography, visible, uid 
    }))(data);
    return properties;
  }

  /**
   * Use the auth object (in params) to either initilise or update user info in the database
   * and gets the final version when the operation is done.
   * 
   * @authObject: object returned by firebaseAuth service after user authentication. 
   *              Only a subset of this obejct's properties will be retained (described in @getBasicProperties)
   *              and saved in the database
   * 
   * The operation: 4 of @authObject properties are subject of change by the user (from profile view), in thsat case
   *                any further updates from should ignore them. Only consider 2 properties will constantly be updated: photoURL and email
   */
  static saveBasicInfo(authObject) { 
    return new Promise((resolve, reject) => {
      //get user in database
      this.get(authObject.uid).then((userFromDB)=>{
        //Extract user properties from the auth object
        let tpl_user = this.getBasicProperties(authObject);
  
        //If user info have already been recorded in database: 
        //Replace existing properties by wha'ts in the database
        if(userFromDB){ 
          tpl_user.biography    = userFromDB.biography;
          tpl_user.visible      = userFromDB.visible;
          tpl_user.displayName  = userFromDB.displayName;
          tpl_user.phoneNumber  = userFromDB.phoneNumber;  
        }else{
          //Otherwise, initialize these properties
          tpl_user.biography    = '';     //set empty string
          tpl_user.visible      = false;  //invisible by default
          tpl_user.displayName  = tpl_user.displayName ? tpl_user.displayName : ''; //empty string if there is no value
          tpl_user.phoneNumber  = tpl_user.phoneNumber ? tpl_user.phoneNumber : ''; //empty string if there is no value
        }
        //...
        resolve(tpl_user);
        console.log('>>resolved' );

        //Note: 'photoURL' and 'email' remains untouched and will always be updated 
        //(because we assume the user might have changed them somewhere else and will expect to see them reflected on this app) 
        //Create or update user record in the database
        let record = {};
        record['/users/'+ authObject.uid] = tpl_user; 
        firebase.database().ref().update(record); 
      });//get user from DB 
    });//[end] new Promise
  }

  //Update user info in the database
  static updateProfile(preferences) {
    let authObject = this.getCurrentUser();
    let tpl_user = {
      biography    : preferences.biography,
      visible      : preferences.visible,
      displayName  : preferences.displayName,
      phoneNumber  : preferences.phoneNumber
    };
    //These properties will always come from the auth service
    //In case user change these outside our app (Google, Yahoo, ...), it will see changes reflected here
    tpl_user.photoURL     = authObject.photoURL;
    tpl_user.email        = authObject.email;
    //Create or update user record in the database
    let record = {};
    record['/users/'+ authObject.uid] = tpl_user;
    return firebase.database().ref().update(record);  
  }

  //return currently logged user info
  static getCurrentUser() {
    return firebase.auth().currentUser;
  }
}

export default DBUser;