/**
 * Component rendering a <GoogleMapReact /> and needs:
 * - @lat: Latitude  
 * - @lng: Longitude 
 */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import Figure from './../Figure/Figure.js';


class Map extends React.Component {
  // static defaultProps = { 
  //   zoom: 11
  // }
  render() {
    const p = {...this.props};

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyACIFpmGqxK8mmy65nY9eKrufxdpea3muo' }}
          defaultCenter={[p.lat, p.lng]} defaultZoom={11}>
          {/* just adding "lat" and "lng" properties to a child component position it on the map */}
          <Figure lat={p.lat} lng={p.lng} img={p.points.photoURL} alt={p.points.displayName} avatar circle size="large" />
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map;