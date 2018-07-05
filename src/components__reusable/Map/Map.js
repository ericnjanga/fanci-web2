/**
 * Component rendering a <GoogleMapReact /> and needs:
 * - @lat: Latitude  
 * - @lng: Longitude 
 * (Displays current user's avatar on the center)
 */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import Figure from './../Figure/Figure.js';
import { appEnv, googleMapAPIkey, devGeoLocations } from './../../services/connection-details';


class Map extends React.Component {

  render() {
    const p = { ...this.props};

    return (
      <div style={p.style}>
        <GoogleMapReact
          bootstrapURLKeys={{key:googleMapAPIkey }}
          defaultCenter={[p.lat, p.lng]} 
          defaultZoom={11}>
          {/* just adding "lat" and "lng" properties to a child component position it on the map */}

          {
            p.listUsersPosts.map((listItem, index) => {

              // Extract basic info
              const item = listItem.user;
              const post = listItem.posts[listItem.posts.length - 1];
              const uData = { ...item };
              const master = { ...p.userProfile };
              let lat = 0;
              let lng = 0;

              // use fake location values for 'dev' environment
              if(appEnv==='dev') {
                if(item.uid!==master.uid) {
                  lat = devGeoLocations[index].lat;
                  lng = devGeoLocations[index].lng;
                } else {
                  lat = devGeoLocations[0].lat;
                  lng = devGeoLocations[0].lng;
                } 

              // use real values for 'production' environment
              } else { 
                lat = item.lat;
                lng = item.lng;
              }

              return (
                <MapUser
                  key={item.uid}
                  item={uData} 
                  message={post}
                  master={master} 
                  lat={lat} 
                  lng={lng}
                />
              );
            })
          }

        </GoogleMapReact>
      </div>
    )
  }
}


/**
 * Display user:  
 * - Avatar
 * - Tooltip containing latest post
 */
class MapUser extends React.Component {

  render() {

    const p = {...this.props};
    const style = {
      tooltip : {
        position: 'relative',
        marginBottom: '15px',
        minWidth: '150px',
        fontSize: '14px',
        display: 'inline-block', 
        backgroundColor: '#333', 
        color: '#ccc',
        padding: '10px',
        borderRadius: '5px'
      },
      tooltipArrow : { 
        position: 'absolute',
        bottom: '-10px',
        left: '10px',
        width: '0',
        height: '0', 
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderTop: '10px solid #333',
      }
    };
    const item = { ...p.item };

    return (
      <div>
        {
          // Don't display tooltip for master user
          (item.uid!==p.master.uid && p.message) && <span style={style.tooltip}>
            <b style={{color: '#ff9800'}}>Fanci</b> {` ${p.message.title}`}
            <span style={style.tooltipArrow} />
          </span>
        }
  
        <Figure
          img={item.photoURL} 
          alt={item.displayName} 
          avatar 
          circle 
          size={(item.uid===p.master.uid)?'large':'med'}
        />
      </div>
    );

  }
}

export default Map;

