import React from 'react';
import { Link } from 'react-router-dom'; 
import { Dropdown, DropdownToggle, DropdownMenu, Button } from 'reactstrap';
import HorizontalNav from './../HorizontalNav/HorizontalNav.js';
import MenuPrimary from './../MenuPrimary.js';
import MenuSecondary from './../MenuSecondary.js'; 
import Figure from './../../components__reusable/Figure/Figure.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import './AppHeader.css';
 
class AppHeader extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
 

  render() {
    const { user, onLogout, navIsActive, onToggleVertNav, onCloseVertNav } = this.props;
    return(
      <header className="AppHeader"> 
        <div className="AppHeader__top">
          <h1 className="AppBrand">
            <Link 
              onClick={onCloseVertNav} 
              to={`/`}>
              Fanci <small><FontAwesomeIcon icon={faMapMarker} /></small>
            </Link> 
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
                    style={{ margin:'0 10px 0 0' }} 
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
                      style={{ margin:'0' }} 
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
                    onCloseVertNav={onCloseVertNav}
                  >
            <MenuPrimary />
          </HorizontalNav>
        } 
      </header>
    ); 

  }//[end] render
}

export default AppHeader;