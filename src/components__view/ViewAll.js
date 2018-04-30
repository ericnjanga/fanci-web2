/**
 * Component encapsulating all views
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 
import ViewAroundUs from './ViewAroundUs/ViewAroundUs.js';
import ViewHome from './ViewHome/ViewHome.js';
import ViewLogin from './ViewLogin/ViewLogin.js';
import ViewProfile from './ViewProfile/ViewProfile.js'; 
import ViewSettings from './ViewSettings/ViewSettings.js';
import ViewTermsAndConditions from './ViewTermsAndConditions/ViewTermsAndConditions.js';
import './ViewAll.css';


const ViewAll = (props) => {
  const p = {...props};
  return( 
    <section>   
      {/* Render login only (if p.user is "unauthenticated") */} 
      <Route exact path="/login" render={() => (
        !p.user && <ViewLogin onRouteChange={p.onRouteChange} onLogin={p.onLogin} />
      )}/>  

      {/* login route doesn't work (if p.user is authenticated) */
        p.user && <Route exact path="/login" render={() => (
          <Redirect to="/"/>
        )}/>
      }

      {
        /* Render views (if p.user is authenticated), otherwise 
        (if p.user is unauthenticated) render login */
      }
      {/* Home? */}
      <Route exact path="/" render={() => (
        !p.user ? (
          <div className="l1"><Redirect to="/login"/></div>
        ) : ( 
          <Route path="/" exact={true} render={() => (
            <ViewHome onRouteChange={p.onRouteChange} />
          )}/>  
        )
      )}/>

      {/* Around Us? */}
      <Route exact path="/around-us" render={() => (
        !p.user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/around-us" exact={true} render={() => (
            <ViewAroundUs list={p.fanciList} toggleSearchPanel={p.toggleSearchPanel} onRouteChange={p.onRouteChange} user={p.user} />
          )}/>  
        )
      )}/>

      {/* Profile? */}
      <Route exact path="/profile" render={() => (
        !p.user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/profile" exact={true} render={()=>{
            return <ViewProfile user={p.user} onRouteChange={p.onRouteChange} onProfileChange={p.onProfileChange} />
          }} /> 
        )
      )}/>

      {/* Settings? */}
      <Route exact path="/settings" render={() => (
        !p.user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/settings" exact={true} render={() => (
            <ViewSettings onRouteChange={p.onRouteChange} />
          )}/>  
        )
      )}/>
      {/* Render views (if logged in) / [login view] (if logged out) */}


      {/* Render [terms & conditions view] at anytime */}
      <Route path="/terms-and-cnditions" exact={true} render={() => (
        <ViewTermsAndConditions onRouteChange={p.onRouteChange} />
      )}/>  
    </section> 
  );
};

export default ViewAll;