/**
 * Component rendering a list of all messages 
 */ 
import React from 'react';
import UserMessage from './../UserMessage/UserMessage.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome';  
import { Alert } from 'reactstrap';
import faHeart from '@fortawesome/fontawesome-free-solid/faHeart'; 
import './UserMessageList.css';


const UserMessageList = (props) => {
  return(
    <section className="UserMessageList"> 
      <h3 className="UserMessageList__title">We <FontAwesomeIcon icon={faHeart} /> TheRock</h3>
      { 
        props.items.length ?props.items.map((item) => {
          return (
            <UserMessage key={item.id} data={item} />
          )
        }) : 
        <Alert color="info">No item found!</Alert>
      } 
    </section>
  );
}

export default UserMessageList;