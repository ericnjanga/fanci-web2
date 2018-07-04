/**
 * Component rendering a <GoogleMapReact /> and needs:
 * - @lat: Latitude  
 * - @lng: Longitude 
 * (Displays current user's avatar on the center)
 */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import Figure from './../Figure/Figure.js';
import { appEnv, googleMapAPIkey } from './../../services/connection-details';

  
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
            p.listUsers.map((item) => {

              // Calculate each item coordinates
              // In a dev environment, use fake 'lat' and 'lng' (added manually on Firebase)
              const coorSuffix = (appEnv=='dev') ? '-dev' : '';
              const latPpt = `lat${coorSuffix}`;
              const lngPpt = `lng${coorSuffix}`;
              // In a dev environment, use hardcoded value for "logged-in" user because data are recreated each time they login
              const lat = item[latPpt] ? item[latPpt] : 43.651356500000006;
              const lng = item[lngPpt] ? item[lngPpt] : -79.5638379;

              const uData = { ...item };
              const master = { ...p.userProfile };
              return (
                <MapUser
                  key={item.uid}
                  item={uData} 
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

  constructor(props) {
    super(props);
  }

  /**
   * Fetch latest post
   * ...
   */
  componentDidMount() {
    console.log(`>>fetchin ${this.props.item.uid} latest post`)
  }

  render() {

    const p = {...this.props};
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
    const item = { ...p.item };

    return (
      <div>
        {
          // Don't display tooltip for master user
          item.uid!==p.master.uid && <span style={style.tooltip}>fjof fiwfioew fewifhwef wefeifnw</span>
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

