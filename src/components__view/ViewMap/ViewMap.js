import React from 'react';
import ViewApp from './../ViewApp.js';
import './ViewMap.css';  
import AppDoc from './../../utilities/AppDoc.class.js';
import Map from './../../components__reusable/Map/Map.js';
import MapPHStyles from './../../jsStyles/MapPlaceholder.styles.js';


class ViewMap extends ViewApp {
  render () {
    const p = { ...this.props}; 
    const nbU = Array(15).fill(0);
    const style = {
      body: {
        height:'85vh', 
        marginLeft:'-15px', 
        marginRight:'-15px' 
      }
    };
    const psStyle_body = { ...MapPHStyles.body, ...style.body};
    return (
      <div className="view__content ViewMap"> 
        { 
          p.geolocation.on===true 
          ? 
          <Map 
            points={p.userProfile} 
            lat={p.geolocation.currPosition.coords.latitude} 
            lng={p.geolocation.currPosition.coords.longitude} 
            style={style.body}
          />
          :
          <DisplayMapPlaceholder 
            bodyStyle={psStyle_body} 
            mainPostStyle={MapPHStyles.mainUser} 
            pointsStyle={MapPHStyles.user} 
            list={nbU}
          />
        } 
      </div> 
    );
  }
}// [end] Home

export default ViewMap;


/*-- Display a Map placeholder --*/
const DisplayMapPlaceholder = (props) => {
  return (
    <div style={props.bodyStyle}> 
      {
        props.list.map((item, index) => { 
          let coord = {}, style;
          coord.left = AppDoc.getRandomArbitrary(30, 300)+'px';
          coord.top = AppDoc.getRandomArbitrary(30, 500)+'px';
          style = { ...props.pointsStyle, ...coord} 
          return <span key={index} style={style} className="animated-background" />
        }) 
      } 
      <span 
        style={props.mainPostStyle} 
        className="animated-background" 
      />
    </div>
  );
}