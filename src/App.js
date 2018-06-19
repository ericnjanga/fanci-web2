/**
 * Main Application
 * ---------------------------
 */ 
import React, {Component } from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import {auth, provider } from './services/firebase.js';
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
import {Container, Row, Col } from 'reactstrap';
import './styles/App.css';
import './styles/components/buttons.css';
import './styles/components/dropdown.css';
import './styles/components/form.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile         : undefined,  
      drawer             : {
        active    : false
      },
      searchPanel        : {
        active: false,
      }, 
      currPathName        : null,
      postList            : null,
      postList_runtime    : null,
      confirmationModal  : {
        active    : false,
        agreed : false,
        content   : false
      },
      geolocation        : {
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
  handleRouteChange(currPathName) {
    this.setState({currPathName: AppDoc.getPathName()});
  }

  //Handles a modal component which plays the role of a "confirm dialog"
  //----------------------
  //Handle confirmationModal state object which:
  //-> Toggles "modal" appearance
  //-> Accepts additional params which allows the modal to be customized on reused anywhere else
  handleConfirmModal(userAnswer, ...params) {   
    let confirmationModal = this.state.confirmationModal; 
    //update user answer ...
    confirmationModal.agreed = (userAnswer!==undefined)?userAnswer:false;
    //simply toggle modal is there is no specifications ...
    if (!params.length) {
      confirmationModal.active = !confirmationModal.active;
    }
     
    //Modal customization params
    if (params.length) {
      let p = params[0];
      if (p.hasOwnProperty('agreed')) {
        confirmationModal.agreed = p.agreed;
      }
      if (p.hasOwnProperty('content')) {
        confirmationModal.content = p.content;
      }
      //modal can also be activated through here...
      if (p.hasOwnProperty('active')) {
        confirmationModal.active = p.active;
      }
      if (p.hasOwnProperty('title')) {
        confirmationModal.title = p.title;
      }
    }
    this.setState({confirmationModal });
  }// [end] handleConfirmModal

  //Shell login method
  handleLogin() {  
    auth.signInWithRedirect(provider);
    auth.getRedirectResult()
    .then((userAuthObject) => {
      //...
    }).catch(function(error) {// [end] user successful login 
      var errorCode = error.code;
      error.log('>>>errorCode=', errorCode);
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
  handleToggleVertNav() { 
    let drawer = this.state.drawer;
    drawer.active = !this.state.drawer.active;
    this.setState({drawer });
  }

  //When we want the nav to be explicitely closed
  handleCloseVertNav() {
    let drawer = this.state.drawer; 
    if (drawer.active) {
      drawer.active = !drawer.active;
      this.setState({drawer });
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
    this.setState({postList_runtime });
  }

  componentDidMount() {

    // Signs users back-in everytime application loads
    // (FirebaseAuth service remembers their credentials)
    auth.onAuthStateChanged((userAuthObject) => {
      // Save fresh user records in database and save a local version to the state
      // (state version might contains some info from the database)
      let userProfile;
      if (userAuthObject) {

        DBUser.saveBasicInfo(userAuthObject)
        .then((currUserInfo) => {
          userProfile = currUserInfo;
          this.setState({userProfile });

          // Get gelolocation object ...
          // save user position in the database and object geolocation state
          Geoloc.getValue().then((geolocation) => {

            if (geolocation.on) {

              const userProfileTmp = userProfile;
              const latLong = Geoloc.getPosition(geolocation);
              userProfile = { ...userProfileTmp, ...latLong };
              DBUser.saveBasicInfo(userProfile);

            }
            //save goelocation object anyway
            this.setState({geolocation });
          });// [end] Get gelolocation object 
        });// [end] DBUser.saveBasicInfo
      } else {
        this.setState({userProfile: null });
      }    
    }, (error) => {
      error.log('>>>error=', error);
    }, (completed) => {
      //...
    });// [end] user sign-in + save

    /**
     * Fetch post list from database:
     * 1) For everyone's timeline: (AROUND US)
     * 1-a) postList_runtime: used for display
     * 1-b) postList: used to filter search
     * 2) For user private timeline: (MY FANCIES)
     * 2-a) upList_runtime: used for display
     * 2-b) upList: used to filter search
     */
    DBPost.getNode().on('value', (snapshot) => {
      const nodeVal = snapshot.val();
      let postList_runtime = [],
      upList_runtime = []; 
      if (nodeVal) {//Avoid error if there is no DB objects 
        const postMap = new Map(Object.entries(nodeVal));
        postMap.forEach((value, key)=>{
          let post = Object.assign({}, value);
          post.id = key;
          //push values in a regular array 
          postList_runtime.push(post);
          postList_runtime = postList_runtime.reverse();//Reverse array (most recent posts first)
          //generate user private list
          const currUserUID = auth.currentUser.uid;
          upList_runtime = postList_runtime.filter((post)=>{ 
            return post.uid===currUserUID;
          });
        });//postMap
      }//nodeVal
      //save array in state
      this.setState({postList_runtime, upList_runtime });
      this.setState({postList:postList_runtime, upList:upList_runtime });
    });// [end] Fetch Fancies ...
    
  }// [end]componentDidMount
  
  handleProfileUpdate(userProfile) {
    this.setState({userProfile });
  }

  /**
   * - Toggle Search Panel visibility
   * - If the panel is being closed and 
   */ 
  toggleSearchPanel() {
    let searchPanel = this.state.searchPanel;
    searchPanel.active = !this.state.searchPanel.active;
    this.setState({searchPanel });
  }
 
  
  render() {
    const s = { ...this.state};  
    return (
      <Router>
        <div className={'App '+s.currPathName}>    
          {/* Display toast when user profile is not loaded yet*/ }
          <Toast active={s.userProfile===undefined}>Connecting to database</Toast>
          
          <AppHeader 
            user={s.userProfile} 
            onLogout={this.handleLogout} 
            onToggleVertNav={this.handleToggleVertNav}
            onCloseVertNav={this.handleCloseVertNav}>
            <MenuPrimary />
          </AppHeader>

          {
            /* Search panel appears only on the timeline*/
              s.currPathName==='around-us' && <SearchPanel 
              isActive={s.searchPanel.active} 
              toggleSearchPanel={this.toggleSearchPanel} 
              handleSearch={this.handlePostSearch} 
            />
          }

          {
            s.confirmationModal.content && 
            <ModalConfirm 
              isOpen={s.confirmationModal.active} 
              toggle={this.handleConfirmModal} 
              title={s.confirmationModal.title}> 
              {s.confirmationModal.content && s.confirmationModal.content() } 
            </ModalConfirm>
          } 

          {
            s.userProfile && 
            <VerticalNav 
              user={s.userProfile} 
              isActive={s.drawer.active} 
              onCloseVertNav={this.handleCloseVertNav}>
                <MenuPrimary />
                <hr className="hr-menu" />
                <MenuSecondary onLogout={this.handleLogout} />
            </VerticalNav>
          }
          
          <section className="AppContent"> 
            {
              <Container>
                <Row>
                  <Col>
                    <ViewAll 
                      { ...s} 
                      toggleSearchPanel={this.toggleSearchPanel} 
                      handleConfirmModal={this.handleConfirmModal} 
                      onRouteChange={this.handleRouteChange} 
                      onProfileChange={this.handleProfileUpdate} 
                      onLogin={this.handleLogin} 
                    />
                  </Col>
                </Row>
              </Container>
            }  
          </section>

          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default App;