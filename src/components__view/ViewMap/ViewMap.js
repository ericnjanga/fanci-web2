import React from 'react'; 
import ViewApp from './../ViewApp.js';
import './ViewMap.css';   
import Map from './../../components__reusable/Map/Map.js'; 
import Toast from './../../components__reusable/Toast/Toast.js';  
import { Alert } from 'reactstrap';


class ViewMap extends ViewApp { 
  render () {  
    const p = {...this.props}; 
    return(
      <div className="view__content ViewMap"> 
        {
          p.geolocation.on===null && <Toast msg={p.geolocation.msg} />
        }
        {
          p.geolocation.on===false && <Alert color="danger" style={{ margin:'50px 20px 0 20px', width:'100%', height:'min-content' }}>{p.geolocation.msg}</Alert>
        }
        { 
          p.geolocation.on===true && <Map points={p.userProfile} lat={p.geolocation.currPosition.coords.latitude} lng={p.geolocation.currPosition.coords.longitude} />
        }
      </div> 
    );
  }
}//[end] Home

export default ViewMap;