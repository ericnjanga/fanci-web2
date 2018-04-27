/**
 * Component encapsulating all views
 */
import React from 'react';
import { Route, Redirect } from 'react-router-dom'; 
import ViewAbout from './ViewAbout/ViewAbout.js';
import ViewArticles from './ViewArticles/ViewArticles.js';
import ViewGallery from './ViewGallery/ViewGallery.js';
import ViewHome from './ViewHome/ViewHome.js';
import ViewProfile from './ViewProfile/ViewProfile.js';
import ViewSettings from './ViewSettings/ViewSettings.js';
import ViewLogin from './ViewLogin/ViewLogin.js';
import ViewTermsAndConditions from './ViewTermsAndConditions/ViewTermsAndConditions.js';
import ViewMessageBoard from './ViewMessageBoard/ViewMessageBoard.js';
import './ViewAll.css';


const ViewAll = (props) => {
  const { user, onLogin, onProfileChange } = props;
  return( 
    <section>   
      {/* Render login only (if user is "unauthenticated") */} 
      <Route exact path="/login" render={() => (
        !user && <ViewLogin onLogin={onLogin} />
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
          <Route path="/" exact={true} component={ViewHome} />
        )
      )}/>

      {/* About? */}
      <Route exact path="/about" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/about" exact={true} component={ViewAbout} />
        )
      )}/>

      {/* Articles? */}
      <Route exact path="/articles" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/articles" exact={true} component={ViewArticles} />
        )
      )}/>

      {/* Gallery? */}
      <Route exact path="/gallery" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/gallery" exact={true} component={ViewGallery} />
        )
      )}/>

      {/* Message Board? */}
      <Route exact path="/message-board" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/message-board" exact={true} render={()=>{
            return <ViewMessageBoard user={user} />
          }} />
        )
      )}/>

      {/* Profile? */}
      <Route exact path="/profile" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/profile" exact={true} render={()=>{
            return <ViewProfile user={user} onProfileChange={onProfileChange} />
          }} /> 
        )
      )}/>

      {/* Settings? */}
      <Route exact path="/settings" render={() => (
        !user ? (
          <Redirect to="/login"/>
        ) : (
          <Route path="/settings" exact={true} component={ViewSettings} />
        )
      )}/>
      {/* Render views (if logged in) / [login view] (if logged out) */}


      {/* Render [terms & conditions view] at anytime */}
      <Route path="/terms-and-cnditions" exact={true} component={ViewTermsAndConditions} />
    </section> 
  );
};

export default ViewAll;