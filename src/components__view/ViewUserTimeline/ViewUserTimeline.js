import React from 'react';
import List from './../../components__reusable/List/List.js';
import DBPost from './../../utilities/DBPost.class.js';
import DBUser from './../../utilities/DBUser.class.js'; 
import PostItem from './../../components__widget/PostItem/PostItem.js';
import PostItemPlaceholder from './../../components__widget/PostItemPlaceholder/PostItemPlaceholder.js'; 
import ViewApp from './../ViewApp.js';
import './ViewTimeline.css';
import { Alert } from 'reactstrap';


class ViewUserTimeline extends ViewApp {
  constructor(props) {

    super(props);
    this.state = {};

  }
  

  componentDidMount() {

    let list = [];

    this.props.listPostSubscription.map((item) => {
            

      const postSnapshot = new Promise((resolve) => {
        DBPost.getItem(item.postID).on('value', (snapshot) => {
          // const postData = snapshot.val();
          const listSubscribers = Object.keys(item.subscribers);
          const data = { postData: snapshot.val(), subscribers: [] };

          console.log('....item.subscribers=', Object.keys(item.subscribers) );
          // if (item.subscribers) {

            listSubscribers.map((uid) => {
              console.log('.....uid=', uid);
              // DBUser.get(uid)
              DBUser.get(uid).then((user) => {
                data.subscribers.push(user);
                if(data.subscribers.length === listSubscribers.length) {
                  resolve(data);
                }
              });

            });

          // }
          

          
        });
      });

      postSnapshot.then((data)=>{

        list.push(data);
        this.setState({ list });
        console.log('...>>>>list=', list);

      });


    });

    // super.componentDidMount();

  }// [end] componentDidMount


  render() {

    const p = { ...this.props };
    const s = { ...this.state };


    return (
      <div className="view__content ViewTimeline">

        <h1 style={{ marginBottom: '30px', textAlign: 'center', fontSize: '1.8rem' }}>My Subscribers</h1>

        <Placeholders isVisible={!p.postList_runtime} />


        {
          // Display all posts items 
          
          s.list && s.list.length ? s.list.map((item) => {


          console.log(' - item=', item);

            return (
              <PostItem
                key={item.postData.date}
                data={item.postData}
                subscribers={item.subscribers}
                displayIfExpired={p.displayExpiredItems}
                style={{ marginTop: '20px' }}
                isCompressed
              />
            );

          }) : 
          <Alert color="info">No item found!</Alert>
        }


      </div>
    );
  }// [end] render
}// [end] ViewTimeline

export default ViewUserTimeline;


/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */
const Placeholders = (props) => {
  if (!props.isVisible) return false;
  return (
    <div>
      <PostItemPlaceholder style={{marginBottom:'20px' }} />
      <PostItemPlaceholder style={{marginBottom:'20px' }} />
      <PostItemPlaceholder style={{marginBottom:'20px' }} />
      <PostItemPlaceholder />
    </div>
  )
}
/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */