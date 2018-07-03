/**
 * Class dedicated to posts
 */
import React from 'react';
import { database } from './../services/connection-details.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUpload from '@fortawesome/fontawesome-free-solid/faUpload';


const nodeName = 'timeline';
const formFieldsTpl = {
  file: {
    label: {
      text:'Upload an image',
      icon: <FontAwesomeIcon icon={faUpload} />
    },
    formField: {
      value:'',
      type:'file',
      placeholder: 'Pick a file'
    }   
  },
  title: {
    label: {
      text:'Fanci Title'
    },
    formField: {
      value:'',
      type:'text',
      placeholder: 'Enter a title'
    }   
  }, 
  expiry: {
    label: {
      text:'Expiry'
    }, 
    formField: {
      value:null,
      options: [
        {val:0, label:'3 hr' },
        {val:1, label:'10 hr' },
        {val:2, label:'1 day' },
        {val:3, label:'1 week' }
      ],
      type:'select',
      placeholder: 'How long this will be displayed?'
    }   
  }, 
  places: {
    label:  {
      text:'Places Available'
    }, 
    formField: {
      value:null,
      options: [
        {val:0, label:'1 to 5' },
        {val:1, label:'5 to 10' },
        {val:2, label:'10 to 15' },
        {val:3, label:'15 up' }
      ],
      type:'select',
      placeholder: 'How many people can participate?'
    }   
  },
  location: {
    label:  {
      text:'Location'
    },  
    formField: {
      value:'',
      type:'text',
      placeholder: 'Where this will take place?'
    }   
  }, 
  content: {
    label:  {
      text:'Fanci Description'
    },   
    formField: {
      value:'',
      type:'textarea',
      placeholder: 'Describe what your fanci is all about!'
    }   
  }
};




function getExpiryDate(val) {
  let _val
  switch(val) {
    case 0: //3hrs
      _val = hourToMillsec(3);
    break;
    case 1: //10hrs
      _val = hourToMillsec(10);
    break;
    case 2: //1 day
      _val = dayToMillsec(1);
    break;
    default: //1 week
      _val = dayToMillsec(7);
  }

  function hourToMillsec(hr) {
    return hr * 60 * 60 * 1000;
  }
  function dayToMillsec(day) {
    return day * 24 * 60 * 60 * 1000;
  }

  return Date.now() + _val;
}


class DBPost {

  /**
   * Returns an obj which properties are only these of "formFieldsTpl"
   * @param {*} obj 
   */
  static getPostObj(obj) {

    let newObj = {};
    for (let ppt in obj) {

      if (formFieldsTpl.hasOwnProperty(ppt)) {
        newObj[ppt] = obj[ppt]; 
      }

    }

    return newObj;
  }
  

  static get formFields() {

    return formFieldsTpl;

  }

  /**
   * Extract and return post object from 'formFieldsTpl
   */
  static getPostObject() {
    const list = new Map(Object.entries(formFieldsTpl));
    let data = {};

    list.forEach((value, key) => {
      let val = value.formField.value;
      data[key] = (val!==null) ? val : value.formField.options[0].val;  
    });
      
    return data;
  }// [end] getPostObject

  /**
   * Get all posts from the database
   * (returns a promise which resolves when an iterator containing the posts is ready)
   * (NOTE: changes to the database wont be reflected on thwe UI because the promise would have been resolved already)
   */
  static getAll() {
    const odePosts = database.ref(nodeName);
    return new Promise((resolve, reject) => {
      odePosts.on('value', (snapshot) => {
        const nodeVal     = snapshot.val();
        const map = new Map(Object.entries(nodeVal));
        resolve(map);
      });// [end] within odePosts 
    });// [end] Promise 
  }// [end] getAll

  
  /**
   * Return database node (for external use)
   */
  static getNode() {

    return database.ref(nodeName);

  }

  
  /**
   * ...
   */
  static getItem(id) {

    return database.ref(`${nodeName}/${id}`);

  }


  /**
   * Save info in the database
   * - copy info in new object and ogment it with new props (uid, date)
   * - return a promise that resolves with a success message
   */
  static save(item, uid) {

    const listRef = database.ref(nodeName);
    let newPost   = Object.assign({}, item);
    newPost.uid   = uid;
    newPost.date  = Date.now();
    newPost.expiryDate = getExpiryDate(newPost.expiry);
    //...
    return new Promise((resolve, reject) => {
      listRef.push(newPost, (error) => { 
        if (error) {
          console.error('Error while pusing: ', error);
        }else{
          resolve('post successful!');
        }
      });// [end] listRef.push
    });// [end] promise

  }// [end] save


  static update(postID, postObj) {
    let newPost = { ...postObj };
    newPost.date  = Date.now();
    newPost.expiryDate = getExpiryDate(newPost.expiry);
    return database.ref(`${nodeName}/${postID}`).update(newPost); 
  }


  static updateField(postID, key, value) {
    let obj = {};
    obj[key] = value;
    return database.ref(`${nodeName}/${postID}`).update(obj); 
  }


  //Delete a post
  static remove(id) {

    return database.ref(`${nodeName}/${id}`).remove();
  }
}

export default DBPost;

 