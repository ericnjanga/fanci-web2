import { database, storage } from '../services/services-init.js';

const nodeName = 'timeline';


/**
 * Get image data from Firebase storage
 * (return null is no value is provided)
 * @param {*} imgRef
 */
const getImg = (imgRef) => {

  return new Promise((resolve) => {

    if (!imgRef) {

      resolve({ url: null });

    }

    storage.ref(imgRef).getDownloadURL().then((url) => {

      resolve({ url });

    });
  });

}


/**
 * Post class
 */
class Posts {

  /**
   * Fetch all posts data from Firebase (will their image if necessary)
   */
  static fetch() {

    const postsNode = database.ref(nodeName);
    return new Promise((resolve) => {

      postsNode.on('value', (snapshot) => {

        const postsMap = new Map(Object.entries(snapshot.val()));
        const postsList = [];
        postsMap.forEach((value, key) => {

          const post = Object.assign({}, value);
          post.id = key;
          getImg(post.file).then((imgObj) => {

            post.img = imgObj.url;
            postsList.push(post);// push values in a regular array

            // Only resolve the entire list of post when all images have been fetched
            if (postsList.length === postsMap.size) {

              resolve(postsList);

            }
          });

        });// postMap

      });// [end] within postsNode
    });// [end] Promise

  }// [end] getAll
}

export default Posts;
