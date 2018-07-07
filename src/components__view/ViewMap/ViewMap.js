import React from 'react';
import ViewApp from './../ViewApp.js';
import './ViewMap.css';
import Map from './../../components__reusable/Map/Map.js';
import placeholder from './../../images/map-placeholder.jpg';


class ViewMap extends ViewApp {

  constructor(props) {

    super(props);
    this.state = {};

  }

  // State update on DidMount should only be done here
  onMount(listUsersPosts) {

    this.setState({ listUsersPosts });

  }


  componentDidMount() {

    const { listUsers, postList } = this.props;

    const listUsersPosts = listUsers.map((uItem) => {

      // returns { user:{}, posts:[{}, {}, {}] }
      return {
        user: uItem,
        posts: postList.filter((pItem) => {

          return pItem.uid === uItem.uid;

        }),
      };

    });

    this.onMount(listUsersPosts);

  }


  render() {

    const p = { ...this.props };
    const s = { ...this.state };

    const style = {
      body: {
        height: 'calc(100vh - 100px)',
        position: 'fixed',
        bottom: '0',
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
          /**
           * Placeholder will keep being displayed if:
           * - Geolocation "is not yet active"
           * - List of users with their posts "is not yet available"
           */
          (p.geolocation.on === true && s.listUsersPosts)
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
            <h4 style={stylePlaceholderImg.heading}>{p.geolocation.msg}</h4>
            <img src={placeholder} style={{ width: '100%' }} alt="Map placeholder" />
          </div>
        }
      </div>
    );

  }

}// [end] Home

export default ViewMap;

