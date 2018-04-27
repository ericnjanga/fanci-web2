import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, Button } from 'reactstrap';

const MenuSecondary = (props) => {
  const { onLogout, onToggleDropdown } = props; 

  //Proveide shell of a function if there is nothing in props
  let toggleDropdown = props.onToggleDropdown?props.onToggleDropdown: ()=> {};

  return( 
    <Nav>
      {props.children}
        
      <NavItem>
        <NavLink to={`/profile`} onClick={onToggleDropdown}>Profile</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={`/settings`} onClick={onToggleDropdown}>Settings</NavLink>
      </NavItem>

      <hr className="hr-menu space" />
      
      <NavItem>
        <Button onClick={ ()=>{onLogout(); toggleDropdown();} }  className="btn-logout">Sign Out</Button> 
      </NavItem>  
    </Nav> 
  );
}

export default MenuSecondary;