/**
 * Class managing file upload/download from Firebase
 */
import { storage } from './../services/firebase.js';

class DBUpload {
  static nodeName = 'timeline';

  static getFile(name) {  
    return new Promise((resolve)=>{
      storage.ref(name).getDownloadURL().then(function(url) { 
        // console.log('>>>>url=', url);
        resolve({url});
      }).catch(function(error) {
        resolve(null); 
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
    return storageRef.put(file, metadata);
  }

  static remove(filePath, mustCleanFilePath) {
    let path = filePath;

    //Clean up the filephath if necessary
    if(mustCleanFilePath){ 
      path = path.replace(/C:\\fakepath\\/, ''); 
      path = 'timeline/'+path;
    }

    // Create a root reference
    let storageRef = storage.ref(path); 
    return storageRef.delete().then(function(snapshot) {
      //--> Need to count bytes and feed progress bar here ...
      // console.log('Uploaded a blob or file!');
    });

  }
}

export default DBUpload;