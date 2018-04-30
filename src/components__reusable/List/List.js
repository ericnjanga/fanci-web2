/**
 * Component rendering a list of all messages 
 */ 
import React from 'react';
import { Alert } from 'reactstrap';
import './UserMessageList.css';


const List = (props) => {
  const p = {...props},
        Item = p.item;
  return(
    <section className="UserMessageList"> 
      { 
        p.items.length ?props.items.map((item) => {
          return (
            <Item key={item.id} data={item} />
          )
        }) : 
        <Alert color="info">No item found!</Alert>
      } 
    </section>
  );
}

export default List;