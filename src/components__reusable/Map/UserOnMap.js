import React from 'react';
import Figure from './../Figure/Figure';

/**
 * Display user:
 * - Avatar
 * - Tooltip containing latest post
 */
const UserOnMap = (props) => {

  const p = { ...props };
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
        size={(item.uid===p.master.uid)?'large':'small'}
      />
    </div>
  );
};

export default UserOnMap;
