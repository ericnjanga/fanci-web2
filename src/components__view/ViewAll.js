/**
 * Component encapsulating all views
 */
import React from 'react';
import UserView from './../components__view/UserView.js';
import { Route, Redirect } from 'react-router-dom';
import ViewTimeline from './ViewTimeline/ViewTimeline.js';
import ViewUserTimeline from './ViewUserTimeline/ViewUserTimeline.js';
import ViewMap from './ViewMap/ViewMap.js';
import ViewLogin from './ViewLogin/ViewLogin.js';
import ViewProfile from './ViewProfile/ViewProfile.js';
import ViewSettings from './ViewSettings/ViewSettings.js';
import ViewAnalytics from './ViewAnalytics/ViewAnalytics.js';
import ViewTermsAndConditions from './ViewTermsAndConditions/ViewTermsAndConditions.js';
import './ViewAll.css';


const ViewAll = (props) => {  
  
  const p = { ...props };

  return (
    <section>
      <UserView />
    </section> 
  );
};

export default ViewAll;




/*


<Route
exact
path="/login"
render={() => (
  !p.userProfile && <ViewLogin { ...p} />
)}
/>  


p.userProfile && <Route
  exact
  path="/login"
  render={() => (
    <Redirect to="/"/>
  )}
/>
}


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
        <ViewTimeline {...p} displayExpiredItems={false} />
      )}
    />  
  )
)}
/>



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
        <ViewUserTimeline { ...p} isMyFancies />
      )}
    />  
  )
)}
/>



<Route 
exact 
path="/my-subscriptions" 
render={() => (
  !p.userProfile ? (
    <Redirect to="/login"/>
  ) : (
    <Route 
      path="/my-subscriptions" 
      exact={true} 
      render={() => (
        <ViewUserTimeline { ...p} isMySubscriptions />
      )}
    />  
  )
)}
/>



<Route 
exact 
path="/my-subscribers"
render={() => (
  !p.userProfile ? (
    <Redirect to="/login"/>
  ) : (
    <Route 
      path="/my-subscribers" 
      exact={true} 
      render={() => (
        <ViewUserTimeline { ...p} isMySubscribers />
      )}
    />  
  )
)}
/>
 


 
<Route 
path="/terms-and-conditions" 
exact={true} 
render={() => (
  <ViewTermsAndConditions { ...p} />
)}
/>

 
<Route 
exact 
path="/analytics" 
render={() => (
  !p.userProfile ? (
    <Redirect to="/login"/>
  ) : (
    <Route 
      path="/analytics" 
      exact={true} 
      render={() => (
        <ViewAnalytics { ...p} isMySubscriptions />
      )}
    />  
  )
)}
/>
 

*/