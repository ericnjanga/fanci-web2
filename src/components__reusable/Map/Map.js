/**
 * Component rendering a <GoogleMapReact /> and needs:
 * - @lat: Latitude  
 * - @lng: Longitude 
 * (Displays current user's avatar on the center)
 */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import Figure from './../Figure/Figure.js';
import { appEnv } from './../../services/connection-details';

  
class Map extends React.Component {
  render() {
    const p = { ...this.props};
    const style = {
      tooltip : {
        marginBottom: '3px',
        minWidth: '150px',
        fontSize: '14px',
        display: 'inline-block', 
        backgroundColor: '#333', 
        color: '#ccc',
        padding: '10px',
        borderRadius: '5px'
      }
    };

    return (
      <div style={p.style}>
        <GoogleMapReact
          bootstrapURLKeys={{key:'AIzaSyACIFpmGqxK8mmy65nY9eKrufxdpea3muo' }}
          defaultCenter={[p.lat, p.lng]} 
          defaultZoom={11}>
          {/* just adding "lat" and "lng" properties to a child component position it on the map */}

          {
            // In a dev environment, use fake 'lat' and 'lng' (added manually on Firebase)
            p.listUsers.map((item) => {
              const coorSuffix = (appEnv=='dev') ? '-dev' : '';
              const latPpt = `lat${coorSuffix}`;
              const lngPpt = `lng${coorSuffix}`;
              // In a dev environment, use hardcoded value for "logged-in" user because data are recreated each time they login
              const lat = item[latPpt] ? item[latPpt] : 43.651356500000006;
              const lng = item[lngPpt] ? item[lngPpt] : -79.5638379;
              return (
                <div 
                  key={item.uid}
                  lat={lat} 
                  lng={lng}>
                  <span style={style.tooltip}>fjof fiwfioew fewifhwef wefeifnw</span>
                  <Figure
                  key={item.uid}
                  lat={lat} 
                  lng={lng}
                    img={item.photoURL} 
                    alt={item.displayName} 
                    avatar 
                    circle 
                    size={(item.uid===p.userProfile.uid)?'large':'med'}
                  />
                </div>
              )
            })
          }

        </GoogleMapReact>
      </div>
    )
  }
}

export default Map;

