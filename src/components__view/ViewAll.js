/**
 * Component encapsulating all views
 */
import React from 'react';
import UserViews from './../components__view/UserViews.js';
import './ViewAll.css';


const ViewAll = (props) => {

  return (
    <UserViews {...props} />
  );

};

export default ViewAll;

