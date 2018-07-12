/**
 * Component rendering a <GoogleMapReact /> and needs:
 * - @lat: Latitude  
 * - @lng: Longitude 
 * (Displays current user's avatar on the center)
 */
import React from 'react';
import UserOnMap from './../../components__reusable/Map/UserOnMap.js';
import { UserContext } from './../../services/services-init';
import GoogleMapReact from 'google-map-react';
import appEnv from './../../settings/env';
import devGeoLocations, { googleMapAPIkey } from './../../settings/geolocation';
import ViewApp from './../../components__view/ViewApp.js';
import withUser from '../../Hoc/withUser.js';


class TheMap extends ViewApp {

  render() {

    const p = { ...this.props };

    return (
      <div style={p.style}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapAPIkey }}
          defaultCenter={[p.lat, p.lng]}
          defaultZoom={11}>
          {
            p.listUsersPosts.map((listItem, index) => {

              // Extract basic info
              const item = listItem.user;
              const post = listItem.posts[listItem.posts.length - 1];
              const uData = { ...item };
              const master = { ...this.props.user };
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
                <UserOnMap
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
    );

  }
};


const Map = withUser(TheMap);

export default Map;
