/**
 * Main Application
 * ---------------------------
 */ 
import React, { Component } from 'react'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import { auth, provider } from './services/firebase.js'; 
import AppHeader from './components__global/AppHeader/AppHeader.js';
import VerticalNav from './components__global/VerticalNav/VerticalNav.js';
import AppFooter from './components__global/AppFooter/AppFooter.js';
import MenuPrimary from './components__global/MenuPrimary.js';
import MenuSecondary from './components__global/MenuSecondary.js'; 
import ViewAll from './components__view/ViewAll.js';  
import Toast from './components__widget/Toast/Toast.js';  
import DBUser from  './utilities/DBUser.class.js';  
import './styles/App.css'; 

 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile     : undefined, 
      vertNavIsActive : false
    }
    this.handleLogin          = this.handleLogin.bind(this);
    this.handleLogout         = this.handleLogout.bind(this);
    this.handleToggleVertNav  = this.handleToggleVertNav.bind(this);
    this.handleCloseVertNav   = this.handleCloseVertNav.bind(this);
    this.handleProfileUpdate  = this.handleProfileUpdate.bind(this);
  }

  //Shell login method
  handleLogin() { 
    auth.signInWithPopup(provider) 
    .then((userAuthObject) => { 
      //Save fresh user records in database and save a local version to the state
      //(state version might contains some info from the database)
      let userProfile;
      DBUser.saveBasicInfo(userAuthObject.user).then((currUserInfo)=>{
        userProfile = currUserInfo; 
        this.setState({ userProfile });
      }); 
    });//[end] user successful login
  }

  //Shell logout method
  handleLogout() {
    auth.signOut().then(() => {
      this.setState({
        userProfile     : null,
        vertNavIsActive : false
      });
    });  
  } 

  //Toggling vertical navigation visibility
  handleToggleVertNav(){  
    this.setState({
      vertNavIsActive: !this.state.vertNavIsActive
    });
  }

  //When we want the nav to be explicitely closed
  handleCloseVertNav(){
    if(this.state.vertNavIsActive){
      this.setState({
        vertNavIsActive: false
      });
    } 
  }

  //Signs users back-in everytime application loads 
  //(FirebaseAuth service remembers their credentials)
  componentDidMount(){
    auth.onAuthStateChanged((userAuthObject) => { 
      //Save fresh user records in database and save a local version to the state
      //(state version might contains some info from the database)
      let userProfile;
      if(userAuthObject){  
        DBUser.saveBasicInfo(userAuthObject).then((currUserInfo)=>{
          userProfile = currUserInfo; 
          this.setState({ userProfile });
        });
      } else {
        this.setState({ userProfile: null });
      }   
    });  
  }//[end]componentDidMount
  
  handleProfileUpdate(userProfile) {
    this.setState({ userProfile });
  }
  
  render() {
    const { userProfile } = this.state;
    const { vertNavIsActive } = this.state;
    return (
      <Router>
        <div className="App"> 
          <AppHeader user={userProfile} onLogout={this.handleLogout} 
          onToggleVertNav={this.handleToggleVertNav}
          onCloseVertNav={this.handleCloseVertNav}>
            <MenuPrimary />
          </AppHeader>

          {
            userProfile && <VerticalNav user={userProfile} isActive={vertNavIsActive} 
            onCloseVertNav={this.handleCloseVertNav}>
              <MenuPrimary />
              <hr className="hr-menu" />
              <MenuSecondary onLogout={this.handleLogout} />
            </VerticalNav>
          }
          
          <section className="AppContent">
            {
              userProfile===undefined ? <Toast msg={'Loading your preferences'} /> : <ViewAll user={userProfile} onProfileChange={this.handleProfileUpdate} onLogin={this.handleLogin} />
            }  
          </section>

          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default App;