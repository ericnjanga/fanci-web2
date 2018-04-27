/**
 * Component rendering the user's avatar
 * - Accepts children components
 */
import React from 'react';
import './UserAvatar.css';

const UserAvatar = (props) => {
  const { item } = props;
  return(
    <section className="UserAvatar">
      <img className="user-avatar" src={item.photoURL} alt={item.displayName} />
      { props.children }
    </section>
  );
}

export default UserAvatar;