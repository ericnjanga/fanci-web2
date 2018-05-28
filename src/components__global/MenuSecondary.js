import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, Button } from 'reactstrap';
import menu, { dropdownSyles } from './../jsStyles/menu.styles.js';

const MenuSecondary = (props) => {
  const { onLogout, onToggleDropdown } = props; 

  //Proveide shell of a function if there is nothing in props
  let toggleDropdown = onToggleDropdown ? onToggleDropdown: ()=> {};

  return( 
    <Nav>
      {props.children}
      
      {/*<NavItem>
        <NavLink to={`/profile`} onClick={ ()=>{ onToggleDropdown(); } }>Profile</NavLink>
      </NavItem>*/} 
      
      <NavItem>
        <NavLink style={dropdownSyles.item} to={`/my-fancies`} onClick={ ()=>{ toggleDropdown(); } }>My Fancies</NavLink>
      </NavItem>
      
      <NavItem>
        <NavLink style={dropdownSyles.item} to={`/settings`} onClick={ ()=>{ toggleDropdown(); } }>Settings</NavLink>
      </NavItem>

      <hr style={menu.hr} className="hr-menu space" />
      
      <NavItem>
        <Button style={dropdownSyles.item} onClick={ ()=>{onLogout(); toggleDropdown();} }  className="btn-logout">Sign Out</Button> 
      </NavItem>  
    </Nav> 
  );
}

export default MenuSecondary;