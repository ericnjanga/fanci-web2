/**
 * Main Application
 * ---------------------------
 */ 
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { auth, provider } from './services/connection-details.js';
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
import DBOptin from './utilities/DBOptin.class.js';
import DBPost from './utilities/DBPost.class.js';
import AppDoc from './utilities/AppDoc.class.js';
import Geoloc from './utilities/Geoloc.class.js';
import { Container, Row, Col } from 'reactstrap';
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
      postList_search    : null,
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
    this.handleConfirmModal   = this.handleConfirmModal.bind(this);
  } // Constructor


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


  // Shell login method
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

  // Shell logout method
  handleLogout() {

    const { drawer } = this.state;
    drawer.active = false;
    auth.signOut().then(() => {

      this.setState({
        userProfile: null,
        drawer,
      });

    });

  }

  // Toggling vertical navigation visibility
  handleToggleVertNav() {

    const { drawer } = this.state;
    drawer.active = !this.state.drawer.active;
    this.setState({ drawer });

  }

  // When we want the nav to be explicitely closed
  handleCloseVertNav() {
    const { drawer } = this.state; 
    if (drawer.active) {
      drawer.active = !drawer.active;
      this.setState({drawer });
    } 
  }


  componentDidMount() { 

    /**
     * SIGNS USERS BACK-IN
     * -------------------
     * (FirebaseAuth service remembers their credentials)
     */

    auth.onAuthStateChanged((userAuthObject) => {

      // Save user record in the database before attempting to retrieve the
      // geolocation coordinates (it's not guaranteed that's why we save user info first)
      let userProfile;
      if (userAuthObject) { 

        DBUser.saveBasicInfo(userAuthObject).then((currUserInfo) => {

          userProfile = currUserInfo;
          this.setState({ userProfile });

          // Get gelolocation object ...
          // save user position in the database and object geolocation state
          Geoloc.getValue().then((geolocation) => { 

            if (geolocation.on) {

              const userProfileTmp = userProfile;
              const latLong = Geoloc.getPosition(geolocation);

              userProfile = { ...userProfileTmp, ...latLong };

              DBUser.saveBasicInfo(userProfile);

            }

            // save geolocation object anyway
            this.setState({ geolocation });

          });// [end] Get geolocation object

        });// [end] DBUser.saveBasicInfo

      } else {

        this.setState({ userProfile: null });

      }
    }, (error) => {

      error.log('>>>error=', error);

    }); // [end] user sign-in + save



    /**
     * GET ALL POSTS
     * -------------
     * 1) For everyone's timeline: (AROUND US)
     * 1-a) postList_search: used for display
     * 1-b) postList: used to filter search
     * 2) For user private timeline: (MY FANCIES)
     * 2-a) upList_runtime: used for display
     * 2-b) upList: used to filter search
     */
    DBPost.getNode().on('value', (snapshot) => {

      const nodeVal = snapshot.val();
      let postList_search = [];
      let upList_runtime = [];
      if (nodeVal) {//Avoid error if there is no DB objects 
        const postMap = new Map(Object.entries(nodeVal));
        postMap.forEach((value, key) => {
          let post = Object.assign({}, value);
          post.id = key;
          //push values in a regular array 
          postList_search.push(post);
          postList_search = postList_search.reverse();//Reverse array (most recent posts first)
          //generate user private list
          const currUserUID = auth.currentUser.uid;
          upList_runtime = postList_search.filter((post) => { 
            return post.uid===currUserUID;
          });
        });//postMap
      }//nodeVal
      //save array in state
      this.setState({ postList_search, upList_runtime });
      this.setState({ postList: postList_search, upList: upList_runtime });

    });// [end] Fetch Fancies ...


    /**
     * GET MY SUBSCRIBERS
     * -------------------
     * Getting post belonging to the "logged user" on which people have subscribed
     */
    DBOptin.getNode().on('value', (snapshot) => {

      const nodeVal = snapshot.val();
      const listPostSubscription = [];
      if (nodeVal) { // Avoid error if there is no DB objects

        const itemMap = new Map(Object.entries(nodeVal));
        itemMap.forEach((value, key) => {

          const item = Object.assign({}, value);
          if (auth.currentUser.uid === item.ownerID) {

            listPostSubscription.push({ postID: key, subscribers: { ...item.subscribers } });

          }

        });// itemMap

        this.setState({ listPostSubscription });

      }// nodeVal

    });// [end] Fetch Fancies ...


    /**
     * GET MY SUBSCRIPTIONS
     * -------------------
     * Getting posts not belonging to the "logged user" on which he/she has subscribed
     */
    DBOptin.getNode().on('value', (snapshot) => {

      const nodeVal = snapshot.val();
      const listMySubscriptions = [];
      if (nodeVal) { // Avoid error if there is no DB objects

        const itemMap = new Map(Object.entries(nodeVal));

        itemMap.forEach((value, postID) => {

          const item = Object.assign({}, value);
          if (auth.currentUser.uid !== item.ownerID) {

            const listSubscribers = Object.keys(item.subscribers);

            listSubscribers.map((subscriberID) => {

              if (subscriberID === auth.currentUser.uid) {

                listMySubscriptions.push({ postID });

              }

              return false;

            });

          }

          return false;

        });// itemMap

        this.setState({ listMySubscriptions });

      }// nodeVal

    });// [end] Fetch Fancies ...


    /**
     * GET ALL USERS
     * -------------
     * (save array of users in the state)
     */
    DBUser.getNode().on('value', (snapshot) => {

      const nodeVal = snapshot.val();
      let listUsers = [];

      if (nodeVal) {//Avoid error if there is no DB objects 
        const postMap = new Map(Object.entries(nodeVal));

        postMap.forEach((item, key) => {

          listUsers.push(item);

        });// postMap

      }// nodeVal

      // save array in state
      this.setState({ listUsers });
      
    });// [end] Fetch Fancies ...

  }// [end]componentDidMount


  // Update state with current path name:
  // (Useful for styling the app at the highest level based on the current route)
  handleRouteChange() {

    this.setState({ currPathName: AppDoc.getPathName() });

  }

  
  handleProfileUpdate(userProfile) {
  
    this.setState({ userProfile });
  
  }

  /**
   * - Toggle Search Panel visibility
   * - If the panel is being closed and
   */
  toggleSearchPanel() {

    const { searchPanel } = this.state;
    searchPanel.active = !this.state.searchPanel.active;
    this.setState({ searchPanel });

  }
 
  
  render() {

    const s = { ...this.state };
    return (
      <Router>
        <div className={`App ${s.currPathName}`}>
          {/* Display toast when user profile is not loaded yet*/ }
          <Toast active={s.userProfile === undefined}>Connecting to database</Toast>
          
          <AppHeader
            user={s.userProfile}
            onLogout={this.handleLogout}
            onToggleVertNav={this.handleToggleVertNav}
            onCloseVertNav={this.handleCloseVertNav}
            {...s}
          >
            <MenuPrimary />
          </AppHeader>

          {
            /* Search panel appears only on the timeline*/
              s.currPathName==='around-us' && <SearchPanel 
              isActive={s.searchPanel.active} 
              toggleSearchPanel={this.toggleSearchPanel} 
              {...s} 
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
              onCloseVertNav={this.handleCloseVertNav}
              {...s}>
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
                      {...s} 
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