import React from 'react';  
import PropTypes from 'prop-types';
import './HorizontalNav.css';

const HorizontalNav = (props) => {
  const { navIsActive, children } = props; 
   
  return( 
    <nav className={'HorizontalNav' + (navIsActive?' is-active':'')}>  
      {children}
    </nav> 
  ); 
}//[end] HorizontalNav


/**
 * Type checking to make sure data received is valid
 * (will throw an error if data received doesn't match the type or is not listed here)
 */
HorizontalNav.propTypes = {
  navIsActive: PropTypes.bool,
  children: PropTypes.object
};


export default HorizontalNav;