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
import ViewAll from './components__view/ViewAll.js';  
import Toast from './components__reusable/Toast/Toast.js';  
import DBUser from './utilities/DBUser.class.js';   
import DBPost from './utilities/DBPost.class.js'; 
import AppDoc from './utilities/AppDoc.class.js'; 
import './styles/App.css'; 
import './styles/components/buttons.css'; 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile         : undefined, 
      vertNavIsActive     : false,
      searchPanelIsActive : false,
      currPathName        : null,
      origFanciList       : null,
      fanciList           : null,
      geolocation         : {
        on        : null,
        msg       : 'Loading your the map'
      },
      currLocation        : null
    }
    this.handleLogin          = this.handleLogin.bind(this);
    this.handleLogout         = this.handleLogout.bind(this);
    this.handleToggleVertNav  = this.handleToggleVertNav.bind(this);
    this.handleCloseVertNav   = this.handleCloseVertNav.bind(this);
    this.handleProfileUpdate  = this.handleProfileUpdate.bind(this);
    this.handleRouteChange    = this.handleRouteChange.bind(this);
    this.toggleSearchPanel    = this.toggleSearchPanel.bind(this);
    this.handleFilterFanciList         = this.handleFilterFanciList.bind(this);
  }

  //Update state with current path name:
  //(Useful for styling the app at the highest level based on the current route) 
  handleRouteChange(currPathName){
    this.setState({ currPathName: AppDoc.getPathName()}); 
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
        });
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


    /**
     * Get geolocation data:
     * -> Keep setting off if feature is not available
     * -> set setting on if: 
     * --> current position is returned
     * --> an error occurs while retriving data
     * (Always update message in any case)
     */
    let geolocation = {...this.state.geolocation};
    if (navigator.geolocation) {
      geolocation.on = true; 
      navigator.geolocation.getCurrentPosition((position)=>{
          geolocation.on = true;
          geolocation.currPosition = position; 
          this.setState({ geolocation }); 
        },
        (err)=>{ 
          geolocation.on = false;
          geolocation.msg = `ERROR(${err.code}): ${err.message}`;
          this.setState({ geolocation }); 
        },
        {timeout:10000}
      );
    } else {
      geolocation.on = false;
      geolocation.msg = 'Geolocation is not supported on your device... Map cannot work, sorry';
      this.setState({ geolocation }); 
    }
  }//[end]componentDidMount
  
  handleProfileUpdate(userProfile) {
    this.setState({ userProfile });
  }

  toggleSearchPanel() {
    this.setState({
      searchPanelIsActive: !this.state.searchPanelIsActive
    });
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

          <SearchPanel isActive={s.searchPanelIsActive} toggleSearchPanel={this.toggleSearchPanel} handleFilter={this.handleFilterFanciList} />

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
              s.userProfile===undefined ? <Toast msg={'Loading your preferences'} /> : <ViewAll {...s} toggleSearchPanel={this.toggleSearchPanel} onRouteChange={this.handleRouteChange} onProfileChange={this.handleProfileUpdate} onLogin={this.handleLogin} />
            }  
          </section>

          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default App;