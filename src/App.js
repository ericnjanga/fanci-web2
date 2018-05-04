/**
 * Main Application
 * ---------------------------
 */ 
import React, { Component } from 'react'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import { auth, provider } from './services/firebase.js'; 
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
      vertNavIsActive     : false,
      searchPanel         : {
        active: false,
      }, 
      currPathName        : null,
      origFanciList       : null,
      fanciList           : null,
      confirmationModal        : {
        active    : false,
        confirmed : false,
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
    this.handleFilterFanciList    = this.handleFilterFanciList.bind(this);
    this.handleConfirmModal       = this.handleConfirmModal.bind(this);
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
    confirmationModal.confirmed = (userAnswer!==undefined)?userAnswer:false;
    //simply toggle modal is there is no specifications ...
    if(!params.length){
      confirmationModal.active = !confirmationModal.active;
    }
     
    //Modal customization params
    if(params.length){ 
      let p = params[0];
      if(p.hasOwnProperty('confirmed')){
        confirmationModal.confirmed = p.confirmed;
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
    auth.signInWithPopup(provider) 
    .then((userAuthObject) => { 
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
      });//[end] DBUser.saveBasicInfo
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

  //Filter the original list of fancies against user search input
  //and updatge the state with the resulting array
  handleFilterFanciList(event) {
    let searchVal = event.target.value; 
    let list = this.state.origFanciList; 
    let fanciList = list.filter((item)=>{  
      return item.title.toLowerCase().search(searchVal) > -1;
    }); 
    this.setState({ fanciList });
  }

  componentDidMount(){
    //Signs users back-in everytime application loads 
    //(FirebaseAuth service remembers their credentials)
    auth.onAuthStateChanged((userAuthObject) => { 
      //Save fresh user records in database and save a local version to the state
      //(state version might contains some info from the database)
      let userProfile;
      if(userAuthObject){  
        DBUser.saveBasicInfo(userAuthObject).then((currUserInfo)=>{
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
        });//[end] DBUser.saveBasicInfo
      } else {
        this.setState({ userProfile: null });
      }   
    });//[END] user sign-in + save

    /**
     * Fetch database records form 2 nodes (relationnal database style: listA and listB)
     * Fetch all elements of listA and for each element of listA:
     * -> find the corresponding element in list B, join it to A and save it into a final list
     */
    DBPost.getNode().on('value', (snapshot) => { 
      const nodeVal = snapshot.val(); 
      let fanciList = []; 
      if(nodeVal){ //Avoid error if there is no DB objects
        const postMap = new Map(Object.entries(nodeVal)); 
        postMap.forEach((value, key)=>{
          let post = Object.assign({}, value);
          post.id = key;
          //push values in a regular array 
          fanciList.push(post); 
          fanciList = fanciList.reverse(); //Reverse array (most recent posts first) 
        });
      } 
      //save array in state
      this.setState({ fanciList }); 
      this.setState({ origFanciList:fanciList }); 
    });//[end] Fetch Fancies ...


    /**** Geoloxc  */
  }//[end]componentDidMount
  
  handleProfileUpdate(userProfile) {
    this.setState({ userProfile });
  }

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
          <AppHeader user={s.userProfile} onLogout={this.handleLogout} 
          onToggleVertNav={this.handleToggleVertNav}
          onCloseVertNav={this.handleCloseVertNav}>
            <MenuPrimary />
          </AppHeader>

          {
            /* Search panel appears only on the timeline*/
            s.currPathName==='around-us' && <SearchPanel isActive={s.searchPanel.active} toggleSearchPanel={this.toggleSearchPanel} handleFilter={this.handleFilterFanciList} />
          }

          {
            s.confirmationModal.content && 
            <ModalConfirm isOpen={s.confirmationModal.active} toggle={this.handleConfirmModal} 
            title={s.confirmationModal.title}> 
              { s.confirmationModal.content && s.confirmationModal.content() } 
            </ModalConfirm>
          }
          

          {
            s.userProfile && <VerticalNav user={s.userProfile} isActive={s.vertNavIsActive} 
            onCloseVertNav={this.handleCloseVertNav}>
              <MenuPrimary />
              <hr className="hr-menu" />
              <MenuSecondary onLogout={this.handleLogout} />
            </VerticalNav>
          }
          
          <section className="AppContent"> 
            {
              s.userProfile===undefined ? <Toast msg={'Loading your preferences'} /> : <ViewAll {...s} toggleSearchPanel={this.toggleSearchPanel} 
              handleConfirmModal={this.handleConfirmModal} onRouteChange={this.handleRouteChange} onProfileChange={this.handleProfileUpdate} onLogin={this.handleLogin} />
            }  
          </section>

          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default App;