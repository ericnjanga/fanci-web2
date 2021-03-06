import React from 'react';
import {Link } from 'react-router-dom';
import './AppFooter.css';

const AppFooter = () => {
  return (
    <footer className="AppFooter"> 
      <p>
        <Link to={`/terms-and-conditions`}>Terms &amp; Conditions</Link>
      </p>  
    </footer>
  );
}

export default AppFooter;