import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faHome from '@fortawesome/fontawesome-free-solid/faHome';
import faComment from '@fortawesome/fontawesome-free-solid/faComment';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';

const MenuPrimary = (props) => { 
  return( 
    <Nav>
      { props.children }
      <NavItem> 
        <NavLink to={`/`} exact>
          <span className="sr-only">Home</span>
          <small><FontAwesomeIcon icon={faHome} /></small>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={`/message-board`}>
          <span className="sr-only">Around Us</span>
          <small><FontAwesomeIcon icon={faComment} /></small>
        </NavLink>
      </NavItem>  
      <NavItem> 
        <NavLink to={`/search`}>
          <span className="sr-only">Around Us</span>
          <small><FontAwesomeIcon icon={faSearch} /></small>
        </NavLink>
      </NavItem> 
    </Nav> 
  );
}

export default MenuPrimary; 