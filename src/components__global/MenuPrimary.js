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
          <span className="txt">Home</span>
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to={`/message-board`}>
          <span className="txt">Around Us</span>
          <FontAwesomeIcon icon={faComment} />
        </NavLink>
      </NavItem>  
      <NavItem> 
        <NavLink to={`/search`}>
          <span className="txt">Search</span>
          <FontAwesomeIcon icon={faSearch} />
        </NavLink>
      </NavItem> 
    </Nav> 
  );
}

export default MenuPrimary; 