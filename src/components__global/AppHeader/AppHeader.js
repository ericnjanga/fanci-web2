import React from 'react';
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import {Dropdown, DropdownToggle, DropdownMenu, Button } from 'reactstrap';
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

    const {
      user, onLogout, navIsActive, onToggleVertNav, userProfile,
    } = this.props;

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

    const currStyle = userProfile ? style.loggedIn : style.loggedOut;


    return (
      <header className="AppHeader" style={currStyle}>
        <div className="AppHeader__top">
          <h1 className="AppBrand">
            
            {
              user ? <Link
                        onClick={onToggleVertNav}
                        to={`/`} style={currStyle.brand}>
                        Fanci <small><FontAwesomeIcon icon={faMapMarker} /></small>
                      </Link>
                    :
                    <Link
                      to={`/`} style={currStyle.brand}>
                      Fanci <small><FontAwesomeIcon icon={faMapMarker} /></small>
                    </Link>
            }
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
                  isOpen={this.state.dropdownOpen} 
                  toggle={this.toggleDropdown} 
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
                      onToggleDropdown={this.toggleDropdown} 
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

  }// [end] render
}// [end] AppHeader


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


