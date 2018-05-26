/**
 * Class managing file upload/download from Firebase
 */
import { storage } from './../services/firebase.js';


const nodeName = 'timeline';

class DBUpload { 

  static getFile(name) {  
    return new Promise((resolve)=>{
      storage.ref(name).getDownloadURL().then(function(url) {  
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
    let storageRef = storage.ref(nodeName+'/'+file.name);  
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
    });

  }
}

export default DBUpload;