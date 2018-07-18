import React from 'react';
import PropTypes from 'prop-types';
import {NavLink } from 'react-router-dom';
import {Nav, NavItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faComment from '@fortawesome/fontawesome-free-solid/faComment';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';

const MenuPrimary = (props) => {

  const { onToggleVertNav } = props;

  return (
    <Nav>
      {props.children }
      <NavItem> 
        <NavLink to={`/`} exact onClick={onToggleVertNav}>
          <span className="txt">Home</span>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={`/around-us`} onClick={onToggleVertNav}>
          <span className="txt">Around Us</span>
          <FontAwesomeIcon icon={faComment} />
        </NavLink>
      </NavItem>  
      <NavItem> 
        <NavLink to={`/profile`} onClick={onToggleVertNav}>
          <span className="txt">Profile</span>
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      </NavItem> 
      <NavItem> 
        <NavLink to={`/list-test`} onClick={onToggleVertNav}>
          <span className="txt">List Test</span>
          <FontAwesomeIcon icon={faUser} />
        </NavLink>
      </NavItem> 
    </Nav> 
  );
}// [end] MenuPrimary


/**
 * Type checking to make sure data received is valid
 * (will throw an error if data received doesn't match the type or is not listed here)
 */
MenuPrimary.propTypes = {
  children: PropTypes.array
};



export default MenuPrimary; 