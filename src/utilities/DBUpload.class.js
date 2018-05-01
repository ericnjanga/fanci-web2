import firebase, { storage } from './../services/firebase.js';

class DBUpload {
  static nodeName = 'timeline';

  static getFile(name) {  
    return new Promise((resolve)=>{
      storage.ref(name).getDownloadURL().then(function(url) { 
        console.log('>>>>url=', url);
        resolve({url});
      }).catch(function(error) {
        resolve({error}); 
      }); 
    }); 
  }
 
  static save(file) { 
    let metadata = {
      //more info here...
      //https://firebase.google.com/docs/storage/web/file-metadata
    };

    // Create a root reference
    let storageRef = storage.ref('timeline/'+file.name);  
    //Upload from a Blob or File
    storageRef.put(file, metadata).then(function(snapshot) {
      //--> Need to count bytes and feed progress bar here ...
      // console.log('Uploaded a blob or file!');
    });
  }
}

export default DBUpload;