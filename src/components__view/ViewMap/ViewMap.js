import React from 'react';
import ViewApp from './../ViewApp.js';
import './ViewMap.css';  
import AppDoc from './../../utilities/AppDoc.class.js';
import Map from './../../components__reusable/Map/Map.js';
import MapPHStyles from './../../jsStyles/MapPlaceholder.styles.js';
import placeholder from './../../images/map-placeholder.jpg';


class ViewMap extends ViewApp {  

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { listUsers, postList } = this.props; 

    const listUsersPosts = listUsers.map((uItem) => {
      // returns { user:{}, posts:[{}, {}, {}] }
      return {
        user: uItem,
        posts: postList.filter((pItem) => {
          return pItem.uid===uItem.uid
        }),
      }; 
    });
    // ...
    this.setState({ listUsersPosts });
  }


  render() {

    const p = { ...this.props };
    const s = { ...this.state };

    const style = {
      body: {
        // height: '85vh',
        // marginLeft: '-15px',
        // marginRight: '-15px',
        height: '85vh',
        position: 'fixed',
        bottom: '23px',
        left: '0',
        width: '100%',
      },
    };

    const stylePlaceholderImg = {
      ...style.body,
      overflow: 'hidden',
      heading: {
        position: 'absolute',
        top: '20%',
        left: '0',
        width: '100%',
        textAlign: 'center',
      },
    }

    return (
      <div className="view__content ViewMap">
        {
          // Render Map only if:
          // - Geolocation is activated and list
          // - List of users with their posts is available
          (p.geolocation.on===true && s.listUsersPosts)
          ? 
          <Map 
            {...p}
            {...s}
            lat={p.geolocation.currPosition.coords.latitude} 
            lng={p.geolocation.currPosition.coords.longitude} 
            style={style.body}
          />
          :
          <div className="blink" style={stylePlaceholderImg}>
            <h4 style={stylePlaceholderImg.heading}>Loading Your Map</h4>
            <img src={placeholder} style={{ width: '100%' }} alt="Map placeholder" />
          </div>
        }
      </div>
    );

  }

}// [end] Home

export default ViewMap;

