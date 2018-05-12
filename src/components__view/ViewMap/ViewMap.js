import React from 'react'; 
import ViewApp from './../ViewApp.js';
import './ViewMap.css';   
import AppDoc from './../../utilities/AppDoc.class.js'; 
import Map from './../../components__reusable/Map/Map.js'; 
import MapPHStyles from './../../jsStyles/MapPlaceholder.styles.js';
// import Toast from './../../components__reusable/Toast/Toast.js';  
// import { Alert } from 'reactstrap';


class ViewMap extends ViewApp { 
  render () {  
    const p = {...this.props}; 
    const nbU = Array(15).fill(0);
    const style = {
      body : { 
        height:'85vh', 
        marginLeft:'-15px', 
        marginRight:'-15px' 
      }
    };
    const psStyle_body = {...MapPHStyles.body, ...style.body};
    return(
      <div className="view__content ViewMap"> 
        {  
          p.geolocation.on===true 
          ? 
          <Map points={p.userProfile} lat={p.geolocation.currPosition.coords.latitude} lng={p.geolocation.currPosition.coords.longitude} 
          style={style.body}/>
          :
          <div style={psStyle_body}>
            {
              nbU.map((item, index)=>{  
                let coord = {}, style;
                coord.left = AppDoc.getRandomArbitrary(30, 300)+'px';
                coord.top = AppDoc.getRandomArbitrary(30, 500)+'px';
                style = {...MapPHStyles.user, ...coord} 
                return <span key={index} style={style} className="animated-background" />
              }) 
            } 
            <span style={MapPHStyles.mainUser} className="animated-background" />
          </div>
        }
        
        
        {
          //p.geolocation.on===false && <Alert color="danger" style={{ margin:'50px 20px 0 20px', width:'100%', height:'min-content' }}>{p.geolocation.msg}</Alert>
        }
        { 
          //p.geolocation.on===true && <Map points={p.userProfile} lat={p.geolocation.currPosition.coords.latitude} lng={p.geolocation.currPosition.coords.longitude} />
        }
      </div> 
    );
  }
}//[end] Home

export default ViewMap;