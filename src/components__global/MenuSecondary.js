import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, Button } from 'reactstrap';
import menu, { dropdownSyles } from './../jsStyles/menu.styles.js';

const MenuSecondary = (props) => {

  const { onLogout, onToggleDropdown, onToggleVertNav } = props;

  let itemStyle = '';

  if (props.style && props.style.item) {

    itemStyle = props.style.item;

  } else {

    itemStyle = dropdownSyles.item;

  }


  // Proveide shell of a function if there is nothing in props
  const toggleDropdown = onToggleDropdown ? onToggleDropdown: ()=> {};
  const toggleVertNav = onToggleVertNav ? onToggleVertNav: ()=> {};
  const linksHandleClick = () => {

    toggleDropdown();
    toggleVertNav();

  };
  const links = [
    {
      url: '/my-fancies',
      name: 'My Fancies',
      isButton: false,
      handleClick: linksHandleClick,
    },
    {
      url: '/my-subscriptions',
      name: 'My subscriptions',
      isButton: false,
      handleClick: linksHandleClick,
    },
    {
      url: '/my-subscribers',
      name: 'My Subscribers',
      isButton: false,
      sepAfter: true,
      handleClick: linksHandleClick,
    },
    {
      url: '/settings',
      name: 'Settings',
      isButton: false,
      handleClick: linksHandleClick,
    },
    {
      url: '/analytics',
      name: 'Analytics',
      isButton: false,
      sepAfter: true,
      handleClick: linksHandleClick,
    },
    {
      className: 'btn-logout',
      name: 'Sign Out',
      isButton: true,
      handleClick: () => {

        onLogout();
        toggleDropdown();

      },
    },
  ];


  return (
    <Nav>
      {props.children}

      {
        links.map((item) => {

          return (
            <MenuNavLink key={item.name} {...item} style={itemStyle}>{item.name}</MenuNavLink>
          );

        })
      }
    </Nav>
  );
}// [end] MenuSecondary


const MenuNavLink = (props) => {

  return (
    <NavItem>
      {
        props.isButton &&
        <Button
          style={props.style}
          onClick={props.handleClick}
          className={props.className}>
          {props.children}
        </Button>
      }
      {
        !props.isButton &&
        <NavLink
          to={props.url}
          style={props.style}
          onClick={props.handleClick}
          className={props.className}>
          {props.children}
        </NavLink>
      }
      {
        props.sepAfter &&
        <hr style={menu.hr} className="hr-menu space" />
      }
    </NavItem> 
  );

}


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