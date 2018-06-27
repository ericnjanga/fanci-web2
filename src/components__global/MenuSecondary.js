import React from 'react';
import PropTypes from 'prop-types';
import {NavLink } from 'react-router-dom';
import {Nav, NavItem, Button } from 'reactstrap';
import menu, {dropdownSyles } from './../jsStyles/menu.styles.js';

const MenuSecondary = (props) => {
  const {onLogout, onToggleDropdown } = props; 

  //Proveide shell of a function if there is nothing in props
  let toggleDropdown = onToggleDropdown ? onToggleDropdown: ()=> {};

  return (
    <Nav>
      {props.children}
      
      {/*<NavItem>
        <NavLink to={`/profile`} onClick={() => {onToggleDropdown(); } }>Profile</NavLink>
      </NavItem>*/} 
      
      <NavItem>
        <NavLink style={dropdownSyles.item} to={`/my-fancies`} onClick={() => { toggleDropdown(); } }>My Fancies</NavLink>
      </NavItem>
      
      <NavItem>
        <NavLink style={dropdownSyles.item} to={`/where-do-i-go`} onClick={() => { toggleDropdown(); } }>Where do I go?</NavLink>
      </NavItem>
      
      <NavItem>
        <NavLink style={dropdownSyles.item} to={`/who-is-coming`} onClick={() => { toggleDropdown(); } }>Who is coming?</NavLink>
      </NavItem>

      <hr style={menu.hr} className="hr-menu space" />
      
      <NavItem>
        <NavLink style={dropdownSyles.item} to={`/settings`} onClick={() => { toggleDropdown(); } }>Settings</NavLink>
      </NavItem>

      <hr style={menu.hr} className="hr-menu space" />
      
      <NavItem>
        <Button style={dropdownSyles.item} onClick={() => {onLogout();toggleDropdown(); } }  className="btn-logout">Sign Out</Button> 
      </NavItem>  
    </Nav> 
  );
}// [end] MenuSecondary


/**
 * Type checking to make sure data received is valid
 * (will throw an error if data received doesn't match the type or is not listed here)
 */
MenuSecondary.propTypes = {
  onLogout: PropTypes.func, 
  onToggleDropdown: PropTypes.func,  
  children: PropTypes.array
};


export default MenuSecondary;