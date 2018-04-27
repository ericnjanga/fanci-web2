import React from 'react';  
import './HorizontalNav.css';

const HorizontalNav = (props) => {
  const { navIsActive } = props; 
   
  return( 
    <nav className={'HorizontalNav' + (navIsActive?' is-active':'')}>  
      {props.children}
    </nav> 
  ); 
}

export default HorizontalNav;