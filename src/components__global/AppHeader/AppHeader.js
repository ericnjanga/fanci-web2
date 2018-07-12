import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UserContext } from './../../services/services-init';
import { Dropdown, DropdownToggle, DropdownMenu, Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker.js';
import HorizontalNav from './../HorizontalNav/HorizontalNav.js';
import MenuPrimary from './../MenuPrimary.js';
import MenuSecondary from './../MenuSecondary.js';
import Figure from './../../components__reusable/Figure/Figure.js';
import './AppHeader.css';


class AppHeader extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);

  }

  toggleDropdown() {

    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });

  }

  render() {

    return (
      <UserContext.Consumer>
        {
          user => (
            <DisplayHeader {...this.props} {...this.state} toggleDropdown={this.toggleDropdown} user={user} />
          )
        }
      </UserContext.Consumer>
    );

  }// [end] render
}// [end] AppHeader


const DisplayHeader = (props) => {

  const { user, onLogout, navIsActive, onToggleVertNav } = props;

  const style = {
    loggedIn: {
      background: '#8ca3ad',
      brand: {
        color: '#fff',
      },
    },
    loggedOut: {
      background: 'transparent',
      brand: {
        color: '#446675',
      },
    },
  };
  const currStyle = user ? style.loggedIn : style.loggedOut;

  return (
    <header className="AppHeader" style={currStyle}>
      <div className="AppHeader__top">
        <h1 className="AppBrand">
          <DisplayBrand user={user} style={currStyle.brand} />
        </h1>
        {
          user && (
            <div>
              <Button
                className="btn-toggle-vertNav--sm" 
                onClick={onToggleVertNav}>
                <Figure 
                  img={user.photoURL} 
                  alt={user.displayName} 
                  avatar 
                  circle 
                  size="small" 
                  style={{margin:'0 10px 0 0' }} 
                /> 
              </Button>
              
              <Dropdown 
                direction="left" 
                isOpen={props.dropdownOpen} 
                toggle={props.toggleDropdown} 
                className="btn-toggle-vertNav--lg">
                <DropdownToggle>
                  <Figure 
                    img={user.photoURL} 
                    alt={user.displayName} 
                    avatar 
                    circle 
                    size="small" 
                    style={{margin:'0' }} 
                  /> 
                </DropdownToggle>
                <DropdownMenu>
                  <MenuSecondary 
                    onLogout={onLogout} 
                    onToggleDropdown={props.toggleDropdown} 
                  /> 
                </DropdownMenu>
              </Dropdown>
            </div>
          )
        }
      </div> 

      {
        user && <HorizontalNav 
                  navIsActive={navIsActive} 
                  onLogout={onLogout} 
                  onToggleVertNav={onToggleVertNav}
                >
          <MenuPrimary />
        </HorizontalNav>
      } 
    </header>
  );
}


const DisplayBrand = (props) => {

  return (
    props.user ?
    <Link
      onClick={props.onToggleVertNav}
      to={`/`} style={props.style}>
      Fanci <small><FontAwesomeIcon icon={faMapMarker} /></small>
    </Link>
    :
    <Link
      to={`/`} style={props.style}>
      Fanci <small><FontAwesomeIcon icon={faMapMarker} /></small>
    </Link>
  );

}


/**
 * Type checking to make sure data received is valid
 * (will throw an error if data received doesn't match the type or is not listed here)
 */
AppHeader.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
  navIsActive: PropTypes.bool,
  onToggleVertNav: PropTypes.func,
};


export default AppHeader;
