import React from 'react'; 
import ViewApp from './../ViewApp.js';
import './ViewHome.css';  
import img1 from './../../images/map.png'; 


class ViewHome extends ViewApp {
  render () {
    return(
      <div className="view__content ViewHome" style={{ backgroundImage:'url('+img1+')' }}> 
        {/* <Map /> coming up */}  
      </div> 
    );
  }
}//[end] Home

export default ViewHome;