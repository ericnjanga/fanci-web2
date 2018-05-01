/**
 * Component rendering a <GoogleMapReact /> and needs:
 * - @lat: Latitude  
 * - @lng: Longitude 
 */
import React from 'react';
import GoogleMapReact from 'google-map-react'

//Organize that later
const Point = ({ text }) => <div>{ text }</div>;




class Map extends React.Component {
  // static defaultProps = { 
  //   zoom: 11
  // }
  render() {
    console.log('>>>>>>>>', {...this.props}); 
    const p = {...this.props};

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:'AIzaSyACIFpmGqxK8mmy65nY9eKrufxdpea3muo' }}
          defaultCenter={[p.lat, p.lng]} defaultZoom={11}>
          <Point lat={p.lat} lng={p.lng} text={'User'} />
        </GoogleMapReact>
      </div>
    )
  }
}

export default Map;