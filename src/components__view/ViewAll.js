/**
 * Component encapsulating all views
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 
import ViewSearch from './ViewSearch/ViewSearch.js';
import ViewArticles from './ViewArticles/ViewArticles.js';
import ViewGallery from './ViewGallery/ViewGallery.js';
import ViewHome from './ViewHome/ViewHome.js';
import ViewProfile from './ViewProfile/ViewProfile.js';
import ViewSettings from './ViewSettings/ViewSettings.js';
import ViewLogin from './ViewLogin/ViewLogin.js';
import ViewTermsAndConditions from './ViewTermsAndConditions/ViewTermsAndConditions.js';
import ViewAroundUs from './ViewAroundUs/ViewAroundUs.js';
import './ViewAll.css';


const ViewAll = (props) => {
  const { user, onLogin, onProfileChange, onRouteChange } = props;
  return( 
    <section>   
      {/* Render login only (if user is "unauthenticated") */} 
      <Route exact path="/login" render={() => (
        !user && <ViewLogin onRouteChange={onRouteChange} onLogin={onLogin} />
      )}/>  

      {/* login route doesn't work (if user is authenticated) */
        user && <Route exact path="/login" render={() => (
          <Redirect to="/"/>
        )}/>
      }

      {
        /* Render views (if user is authenticated), otherwise 
        (if user is unauthenticated) render login */
      }
      {/* Home? */}
      <Route exact path="/" render={() => (
        !user ? (
          <div className="l1"><Redirect to="/login"/></div>
        ) : ( 
          <Route path="/" exact={true} render={() => (
            <ViewHome onRouteChange={onRouteChange} />
          )}/>  
        )
      )}/>

      {/* Around Us? */}
      <Route exact path="/around-us" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/around-us" exact={true} render={() => (
            <ViewAroundUs onRouteChange={onRouteChange} user={user} />
          )}/>  
        )
      )}/>

      {/* Search */}
      <Route exact path="/search" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/search" exact={true} render={() => (
            <ViewSearch onRouteChange={onRouteChange} />
          )}/>   
        )
      )}/>

      {/* Profile? */}
      <Route exact path="/profile" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/profile" exact={true} render={()=>{
            return <ViewProfile user={user} onRouteChange={onRouteChange} onProfileChange={onProfileChange} />
          }} /> 
        )
      )}/>

      {/* Settings? */}
      <Route exact path="/settings" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/settings" exact={true} render={() => (
            <ViewSettings onRouteChange={onRouteChange} />
          )}/>  
        )
      )}/>
      {/* Render views (if logged in) / [login view] (if logged out) */}


      {/* Render [terms & conditions view] at anytime */}
      <Route path="/terms-and-cnditions" exact={true} render={() => (
        <ViewTermsAndConditions onRouteChange={onRouteChange} />
      )}/>  
    </section> 
  );
};

export default ViewAll;