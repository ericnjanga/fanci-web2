/**
 * Component encapsulating all views
 */
import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import ViewTimeline from './ViewTimeline/ViewTimeline.js';
import ViewMap from './ViewMap/ViewMap.js';
import ViewLogin from './ViewLogin/ViewLogin.js';
import ViewProfile from './ViewProfile/ViewProfile.js';
import ViewSettings from './ViewSettings/ViewSettings.js';
import ViewTermsAndConditions from './ViewTermsAndConditions/ViewTermsAndConditions.js';
import './ViewAll.css';


const ViewAll = (props) => {

  const p = { ...props };

  return (
    <section>
      {/* Render login only (if p.userProfile is "unauthenticated") */}
      <Route
        exact
        path="/login"
        render={() => (
          !p.userProfile && <ViewLogin { ...p} />
        )}
      />  

      {/* login route doesn't work (if p.userProfile is authenticated) */
        p.userProfile && <Route
          exact
          path="/login"
          render={() => (
            <Redirect to="/"/>
          )}
        />
      }

      {
        /* Render views (if p.userProfile is authenticated), otherwise 
        (if p.userProfile is unauthenticated) render login */
      }
      {/* Home? */}
      <Route 
        exact 
        path="/" 
        render={() => (
          !p.userProfile ? (
            <div className="l1"><Redirect to="/login"/></div>
          ) : ( 
            <Route 
              path="/" 
              exact={true} 
              render={() => (
                <ViewMap { ...p} />
              )}
            />  
          )
        )}
      />

      {/* Around Us? */}
      <Route 
        exact 
        path="/around-us" 
        render={() => (
          !p.userProfile ? (
            <Redirect to="/login"/>
          ) : (
            <Route 
              path="/around-us" 
              exact={true} 
              render={() => (
                <ViewTimeline { ...p} displayExpiredItems={false} />
              )}
            />  
          )
        )}
      />

      {/* Profile? */}
      <Route
        exact
        path="/profile"
        render={() => (
          !p.userProfile ? (
            <Redirect to="/login"/>
          ) : (
            <Route
              path="/profile"
              exact={true}
              render={() => {

                return <ViewProfile {...p} />;
                
              }} 
            />
          )
        )}
      />

      {/* Settings? */}
      <Route 
        exact 
        path="/settings" 
        render={() => (
          !p.userProfile ? (
            <Redirect to="/login"/>
          ) : (
            <Route 
              path="/settings" 
              exact={true} 
              render={() => (
                <ViewSettings { ...p} />
              )}
            />  
          )
        )}
      />

      {/* My fancies? */}
      <Route 
        exact 
        path="/my-fancies" 
        render={() => (
          !p.userProfile ? (
            <Redirect to="/login"/>
          ) : (
            <Route 
              path="/my-fancies" 
              exact={true} 
              render={() => (
                <ViewTimeline { ...p} />
              )}
            />  
          )
        )}
      />
      {/* Render views (if logged in) / [login view] (if logged out) */}


      {/* Render [terms & conditions view] at anytime */}
      <Route 
        path="/terms-and-cnditions" 
        exact={true} 
        render={() => (
          <ViewTermsAndConditions { ...p} />
        )}
      />  
    </section> 
  );
};

export default ViewAll;