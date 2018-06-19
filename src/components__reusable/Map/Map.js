/**
 * Component rendering a <GoogleMapReact /> and needs:
 * - @lat: Latitude  
 * - @lng: Longitude 
 * (Displays current user's avatar on the center)
 */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import Figure from './../Figure/Figure.js';


class Map extends React.Component {
  render() {
    const p = { ...this.props};

    return (
      <div style={p.style}>
        <GoogleMapReact
          bootstrapURLKeys={{key:'AIzaSyACIFpmGqxK8mmy65nY9eKrufxdpea3muo' }}
          defaultCenter={[p.lat, p.lng]} 
          defaultZoom={11}>
          {/* just adding "lat" and "lng" properties to a child component position it on the map */}
          <Figure 
            lat={p.lat} 
            lng={p.lng} 
            img={p.points.photoURL} 
            alt={p.points.displayName} 
            avatar 
            circle size="large" 
          />
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map;

