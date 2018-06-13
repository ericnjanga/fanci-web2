import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


const DateFormat = (props) => {
  return(
    <span>{ moment(props.millisec).format('MMMM Do, YYYY') }</span>
  );
}


/**
 * Type checking to make sure data received is valid
 * (will throw an error if data received doesn't match the type or is not listed here)
 */
DateFormat.propTypes = {
  millisec: PropTypes.number
};


export default DateFormat;