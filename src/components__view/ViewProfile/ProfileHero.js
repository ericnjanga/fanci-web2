import React from 'react';
import Figure from './../../components__reusable/Figure/Figure.js';
import DateFormat from './../../components__reusable/DateFormat.js';

const ProfileHero = (props) => {

  if (!props.user) {
  
    return false;
  
  }

  return(
    <div> 
      <Figure
        img={props.user.photoURL}
        alt={props.user.displayName}
        className="user-avatar"
        avatar
        circle
        size="xxl"
        style={{ textAlign: 'center' }}
      />
      {
        props.user.lastSignin &&
        <p style={{ display:'flex', marginTop:'5px', flexDirection:'column', textAlign:'center' }}>
          <small style={{color:'rgba(0,0,0,0.5)' }}>Last Signin</small>
          <DateFormat millisec={props.user.lastSignin} />
        </p> 
      }
    </div>
  );
};

export default ProfileHero;