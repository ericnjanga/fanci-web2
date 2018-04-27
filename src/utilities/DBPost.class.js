/**
 * Class dedicated to posts
 */
import firebase from './../services/firebase.js';


class DBPost {
  
  //Get all posts from the database
  //(returns a promise which resolves when an iterator containing the posts is ready)
  //(NOTE: changes to the database wont be reflected on thwe UI because the promise would have been resolved already)
  static getAll() {
    const odePosts = firebase.database().ref('board-msg');
    return new Promise((resolve, reject) => {
      odePosts.on('value', (snapshot) => {
        const nodeVal     = snapshot.val(); 
        const map = new Map(Object.entries(nodeVal));
        resolve(map); 
      });//[end] within odePosts 
    });//[end] Promise 
  }//[end] getAll

  
  //Return database node (for external use)
  static getNode() {
    return firebase.database().ref('board-msg');
  }

  
  //Save info in the database
  //- copy info in new object and ogment it with new props (uid, date)
  //- return a promise that resolves with a success message
  static save(item, uid) {
    const listRef = firebase.database().ref('board-msg');
    let post = Object.assign({}, item);
    post.uid = uid;
    post.date = Date.now();
    //...
    return new Promise((resolve, reject) => {
      listRef.push(post, (error)=>{  
        if(error){
          console.error('Error while pusing: ', error);
        }else{
          resolve('post successful!');
        }
      });//[end] listRef.push
    });//[end] promise 
  }//[end] save
}

export default DBPost;

 