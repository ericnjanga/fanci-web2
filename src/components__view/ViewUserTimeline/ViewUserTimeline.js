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

  /**
   * Fetch the following lists: (depending on param provided)
   * - "My subscriptions"
   * - "My subscribers"
   * (List is filled as soon as a post data is resolved)
   */
  componentDidMount() {

    /**
     * Extract data of :
     * - Each post subscribed
     */
    const list = [];

    // Fetch "My subscriptions" list
    if (this.props.isMySubscriptions) {

      this.props.listMySubscriptions.map((item) => {

        /**
         * Get a promise which is supposed to resolve with { postObject }
         */
        const postSubscripSnapshot = new Promise((resolve) => {

          DBPost.getItem(item.postID).on('value', (snapshot) => {

            const data = { postData: snapshot.val() };
            resolve(data);
  
          });
  
        }); // postSubscripSnapshot
  
  
        /**
         * Save post+user data in the list
         * (for each resolved promise)
         */
        postSubscripSnapshot.then((data) => {
  
          list.push(data);
          this.setState({ list, title: 'My Subscriptions' });
  
        });

        return false;
  
      }); // listPostSubscription

    } // Setting up "MySubscriptions"




    // Fet "My subscribers" list
    if (this.props.isMySubscribers) {

      this.props.listPostSubscription.map((item) => {

        /**
         * Get a promise which is supposed to resolve with { postObject, subscribersArray[ userObj, userObj, ...] }
         * (resolves only when post data and all subscribers data are retrieved)
         */
        const postSubscripSnapshot = new Promise((resolve) => {

          DBPost.getItem(item.postID).on('value', (snapshot) => {
  
            const listSubscribers = Object.keys(item.subscribers);
  
            // Save post data and prepare subscribers array
            const data = { postData: snapshot.val(), subscribers: [] };
  
            listSubscribers.map((uid) => {
  
              DBUser.get(uid).then((user) => {
  
                data.subscribers.push(user);
  
                // Resolve promise only when all subscribers data has been retrieved
                if (data.subscribers.length === listSubscribers.length) {
  
                  resolve(data);
  
                }
  
              });
  
            });
  
          });
  
        }); // postSubscripSnapshot
  
  
        /**
         * Save post+user data in the list
         * (for each resolved promise)
         */
        postSubscripSnapshot.then((data) => {
  
          list.push(data);
          this.setState({ list, title: 'My Subscribers' });
  
        });

        return false;
  
      }); // listPostSubscription

    } // Setting up "MySubscribers"

  }// [end] componentDidMount


  render() {

    const p = { ...this.props };
    const s = { ...this.state };


    return (
      <div className="view__content ViewTimeline">

        <h1 style={{ marginBottom: '30px', textAlign: 'center', fontSize: '1.8rem' }}>
          { this.props.isMySubscribers && s.title }
          { this.props.isMySubscriptions && s.title }
        </h1>

        <Placeholders isVisible={!p.postList_runtime} />


        {
          // Display all posts items
          
          s.list && s.list.length ? s.list.map((item) => {

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