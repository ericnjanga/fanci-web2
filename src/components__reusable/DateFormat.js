import React from 'react';
import moment from 'moment';

const DateFormat = (props) => {
  return(
    <span>{ moment(props.millisec).format('MMMM Do, YYYY') }</span>
  );
}


export default DateFormat;