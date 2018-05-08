/**
 * Main Application
 * ---------------------------
 */ 
import React, { Component } from 'react'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import { auth, provider } from './services/firebase.js'; 
import './utilities/polyfills.js';
import AppHeader from './components__global/AppHeader/AppHeader.js';
import VerticalNav from './components__global/VerticalNav/VerticalNav.js';
import SearchPanel from './components__widget/SearchPanel/SearchPanel.js';  
import AppFooter from './components__global/AppFooter/AppFooter.js';
import MenuPrimary from './components__global/MenuPrimary.js';
import MenuSecondary from './components__global/MenuSecondary.js';
import ModalConfirm from './components__reusable/ModalConfirm/ModalConfirm.js';   
import ViewAll from './components__view/ViewAll.js';  
import Toast from './components__reusable/Toast/Toast.js';  
import DBUser from './utilities/DBUser.class.js';   
import DBPost from './utilities/DBPost.class.js'; 
import AppDoc from './utilities/AppDoc.class.js'; 
import Geoloc from './utilities/Geoloc.class.js'; 
import './styles/App.css'; 
import './styles/components/buttons.css'; 
import './styles/components/dropdown.css'; 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile         : undefined,  
      drawer              : {
        active    : false
      },
      searchPanel         : {
        active: false,
      }, 
      currPathName        : null,
      postList            : null,
      postList_runtime    : null,
      confirmationModal   : {
        active    : false,
        user_pick : false,
        content   : false
      },
      geolocation         : {
        on        : null,
        msg       : 'Loading map'
      }
    }
    this.handleLogin          = this.handleLogin.bind(this);
    this.handleLogout         = this.handleLogout.bind(this);
    this.handleToggleVertNav  = this.handleToggleVertNav.bind(this);
    this.handleCloseVertNav   = this.handleCloseVertNav.bind(this);
    this.handleProfileUpdate  = this.handleProfileUpdate.bind(this);
    this.handleRouteChange    = this.handleRouteChange.bind(this);
    this.toggleSearchPanel    = this.toggleSearchPanel.bind(this);
    this.handlePostSearch     = this.handlePostSearch.bind(this);
    this.handleConfirmModal   = this.handleConfirmModal.bind(this);
  }

  //Update state with current path name:
  //(Useful for styling the app at the highest level based on the current route) 
  handleRouteChange(currPathName){
    this.setState({ currPathName: AppDoc.getPathName()}); 
  }

  //Handles a modal component which plays the role of a "confirm dialog"
  //----------------------
  //Handle confirmationModal state object which:
  //-> Toggles "modal" appearance
  //-> Accepts additional params which allows the modal to be customized on reused anywhere else
  handleConfirmModal(userAnswer, ...params) {    
    let confirmationModal = this.state.confirmationModal; 
    //update user answer ...
    confirmationModal.user_pick = (userAnswer!==undefined)?userAnswer:false;
    //simply toggle modal is there is no specifications ...
    if(!params.length){
      confirmationModal.active = !confirmationModal.active;
    }
     
    //Modal customization params
    if(params.length){ 
      let p = params[0];
      if(p.hasOwnProperty('user_pick')){
        confirmationModal.user_pick = p.user_pick;
      }
      if(p.hasOwnProperty('content')){
        confirmationModal.content = p.content;
      }
      //modal can also be activated through here...
      if(p.hasOwnProperty('active')){
        confirmationModal.active = p.active;
      }
      if(p.hasOwnProperty('title')){
        confirmationModal.title = p.title;
      }
    }
    this.setState({ confirmationModal }); 
  }//[end] handleConfirmModal

  //Shell login method
  handleLogin() { 
    // auth.signInWithPopup(provider) 
    // .then((userAuthObject) => { 


    auth.signInWithRedirect(provider);
    auth.getRedirectResult()
    .then((userAuthObject) => { 
      console.log('************************userAuthObject=', userAuthObject) /*
      //Save fresh user records in database and save a local version to the state
      //(state version might contains some info from the database)
      let userProfile;
      DBUser.saveBasicInfo(userAuthObject.user).then((currUserInfo)=>{
        userProfile = currUserInfo; 
        this.setState({ userProfile }); 
        //Get gelolocation object ...
        //save user position in the database and object geolocation state
        Geoloc.getValue().then((geolocation)=>{ 
          if(geolocation.on) { 
            let {userProfile} = this.state;
            let latLong = Geoloc.getPosition(geolocation);
            userProfile = {...userProfile, ...latLong}; 
            DBUser.saveBasicInfo(userProfile);
          }
          //save goelocation object anyway
          this.setState({ geolocation });
        });//[end] Get gelolocation object 
      });//[end] DBUser.saveBasicInfo */
    }).catch(function(error) {//[end] user successful login
      // Handle Errors here.
      var errorCode = error.code;
      console.log('>>>errorCode=', errorCode);
      // var errorMessage = error.message;
      // // The email of the user's account used.
      // var email = error.email;
      // // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // // ...
    });
  }

  //Shell logout method
  handleLogout() {
    let drawer = this.state.drawer;
    drawer.active = false;
    auth.signOut().then(() => {
      this.setState({
        userProfile     : null,
        drawer
      }); 
    });  
  } 

  //Toggling vertical navigation visibility
  handleToggleVertNav(){  
    let drawer = this.state.drawer;
    drawer.active = !this.state.drawer.active;
    this.setState({ drawer });
  }

  //When we want the nav to be explicitely closed
  handleCloseVertNav(){
    let drawer = this.state.drawer; 
    if(drawer.active){
      drawer.active = !drawer.active;
      this.setState({ drawer });
    } 
  }

  //Filter the original list of fancies against user search input
  //and updatge the state with the resulting array
  handlePostSearch(event) {
    let searchVal = event.target.value; 
    let list = this.state.postList; 
    let postList_runtime = list.filter((item)=>{  
      return item.title.toLowerCase().search(searchVal) > -1;
    }); 
    this.setState({ postList_runtime });
  }

  componentDidMount(){
    //Signs users back-in everytime application loads 
    //(FirebaseAuth service remembers their credentials)
    
    // console.log('A**--firebase.auth().onAuthStateChanged', auth.onAuthStateChanged)
    let unsubscribe_function = auth.onAuthStateChanged((userAuthObject) => { 
      //Save fresh user records in database and save a local version to the state
      //(state version might contains some info from the database)
      let userProfile;
      // console.log('1**userAuthObject')
      if(userAuthObject){  
        // console.log('2**userAuthObject')
        DBUser.saveBasicInfo(userAuthObject)
        .then((currUserInfo)=>{
          userProfile = currUserInfo; 
          // console.log('3**userProfile')
          this.setState({ userProfile });

          //Get gelolocation object ...
          //save user position in the database and object geolocation state
          Geoloc.getValue().then((geolocation)=>{ 
            if(geolocation.on) { 
              let {userProfile} = this.state;
              let latLong = Geoloc.getPosition(geolocation);
              userProfile = {...userProfile, ...latLong}; 
              DBUser.saveBasicInfo(userProfile);
            }
            //save goelocation object anyway
            this.setState({ geolocation });
          });//[end] Get gelolocation object 
        });//[end] DBUser.saveBasicInfo
      } else {
        // console.log('4**userProfile')
        this.setState({ userProfile: null });
      }   
      // console.log('5**userProfile')
    }, (error) => {
      // console.log('>>>error=', error)
    }, (completed) => {
      // console.log('>>>completed=', completed)
    });//[END] user sign-in + save
 

  
    /**** Geoloxc  */
  }//[end]componentDidMount
  
  handleProfileUpdate(userProfile) {
    this.setState({ userProfile });
  }

  /**
   * - Toggle Search Panel visibility
   * - If the panel is being closed and 
   */
  //
  //
  toggleSearchPanel() {
    let searchPanel = this.state.searchPanel;
    searchPanel.active = !this.state.searchPanel.active;
    this.setState({ searchPanel });
  }
 
  
  render() {
    const s = {...this.state};  
    return (
      <Router>
        <div className={'App '+s.currPathName}>  
          {
            //console.log('[[R]] s.userProfile=', s.userProfile)
          }

          { //Display toast when user profile is not loaded yet
            s.userProfile===undefined && <Toast msg={'Fetching your preferences'} />
          }
 
          
          <AppHeader user={s.userProfile} onLogout={this.handleLogout} 
          onToggleVertNav={this.handleToggleVertNav}
          onCloseVertNav={this.handleCloseVertNav}>
            <MenuPrimary />
          </AppHeader>

          {
            /* Search panel appears only on the timeline*/
            s.currPathName==='around-us' && <SearchPanel isActive={s.searchPanel.active} toggleSearchPanel={this.toggleSearchPanel} handleSearch={this.handlePostSearch} />
          }

          {
            s.confirmationModal.content && 
            <ModalConfirm isOpen={s.confirmationModal.active} toggle={this.handleConfirmModal} 
            title={s.confirmationModal.title}> 
              { s.confirmationModal.content && s.confirmationModal.content() } 
            </ModalConfirm>
          }
          

          {
            s.userProfile && <VerticalNav user={s.userProfile} isActive={s.drawer.active} 
            onCloseVertNav={this.handleCloseVertNav}>
              <MenuPrimary />
              <hr className="hr-menu" />
              <MenuSecondary onLogout={this.handleLogout} />
            </VerticalNav>
          }
          
          <section className="AppContent"> 
            {
              <ViewAll {...s} toggleSearchPanel={this.toggleSearchPanel} handleConfirmModal={this.handleConfirmModal} 
              onRouteChange={this.handleRouteChange} onProfileChange={this.handleProfileUpdate} onLogin={this.handleLogin} />
            }  
          </section>

          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default App;