/**
 * Component rendering a list of all messages 
 */ 
import React from 'react';
import {Alert } from 'reactstrap';


const List = (props) => {

  const p = { ...props };
  const Item = p.itemComp;

  return (
    <section style={p.style}>
      {
        p.items.length ? props.items.map((item) => {
          return (
            <Item
              key={item.id}
              loggedUserID={p.user.uid}
              data={item}
              handleConfirmModal={p.handleConfirmModal}
              toggleTimelineModal={p.toggleTimelineModal}
              confirmationModal={p.confirmationModal}
              displayIfExpired={p.displayExpiredItems}
              style={p.itemStyle}
              isTimeline
            />
          )
        }) : 
        <Alert color="info">No item found!</Alert>
      }
    </section>
  );

}

export default List;
