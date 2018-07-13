import React from 'react';
import Figure from './../Figure/Figure';
import PropTypes from 'prop-types';


/**
 * Display user:
 * - Avatar
 * - Tooltip containing latest post
 */
const UserOnMap = ({ item, master, message }) => {

  // const p = { ...props };
  const style = {
    tooltip: {
      position: 'relative',
      marginBottom: '15px',
      minWidth: '150px',
      fontSize: '14px',
      display: 'inline-block',
      backgroundColor: '#333',
      color: '#ccc',
      padding: '10px',
      borderRadius: '5px',
    },
    tooltipArrow: { 
      position: 'absolute',
      bottom: '-10px',
      left: '10px',
      width: '0',
      height: '0', 
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
      borderTop: '10px solid #333',
    },
  };

  if (!item || !master || !message) {
    return false;
  }

  console.log('>>>>>>', item, '||', master, '||', message);

  return (
    <div>
      {
        // Don't display tooltip for master user
        (item.uid!==master.uid && message) && <span style={style.tooltip}>
          <b style={{color: '#ff9800'}}>Fanci</b> {` ${message.title}`}
          <span style={style.tooltipArrow} />
        </span>
      }

      <Figure
        img={item.photoURL}
        alt={item.displayName}
        avatar
        circle
        size={(item.uid === master.uid) ? 'large' : 'small'}
      />
    </div>
  );
};

export default UserOnMap;


UserOnMap.propTypes = {
  item: PropTypes.shape.isRequired,
  master: PropTypes.shape.isRequired,
  message: PropTypes.string.isRequired,
};
