import React from 'react';
import { Link } from 'react-router-dom'; 
import { Dropdown, DropdownToggle, DropdownMenu, Button } from 'reactstrap';
import HorizontalNav from './../HorizontalNav/HorizontalNav.js';
import MenuPrimary from './../MenuPrimary.js';
import MenuSecondary from './../MenuSecondary.js'; 
import UserAvatar from './../../components__widget/UserAvatar/UserAvatar.js';
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
            <Link onClick={onCloseVertNav} to={`/`}>
              The Rock <small>Fan Club</small>
            </Link> 
          </h1> 
          { 
            user && (
              <div>
                <Button className="btn-toggle-vertNav--sm" onClick={onToggleVertNav}>
                  <UserAvatar item={user} /> 
                </Button>
                
                <Dropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} className="btn-toggle-vertNav--lg">
                  <DropdownToggle>
                    <UserAvatar item={user} /> 
                  </DropdownToggle>
                  <DropdownMenu>
                    <MenuSecondary onLogout={onLogout} onToggleDropdown={this.toggleDropdown} /> 
                  </DropdownMenu>
                </Dropdown>
              </div>
            )
          }
        </div> 

        {
          user && <HorizontalNav navIsActive={navIsActive} onLogout={onLogout} onCloseVertNav={onCloseVertNav}>
            <MenuPrimary />
          </HorizontalNav>
        } 
      </header>
    ); 

  }//[end] render
}

export default AppHeader;