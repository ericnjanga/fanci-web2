import React from 'react';
import withUser from './../Hoc/withUser.js';
import { Route, Redirect } from 'react-router-dom';
import ViewApp from './../components__view/ViewApp.js';
import ViewLogin from './ViewLogin/ViewLogin.js';
import ViewMap from './ViewMap/ViewMap.js';
import ViewTimeline from './ViewTimeline/ViewTimeline.js';
import ViewUserTimeline from './ViewUserTimeline/ViewUserTimeline.js';
import ViewProfile from './ViewProfile/ViewProfile.js';
import ViewSettings from './ViewSettings/ViewSettings.js';
import ViewAnalytics from './ViewAnalytics/ViewAnalytics.js';
import ViewTermsAndConditions from './ViewTermsAndConditions/ViewTermsAndConditions.js';


const UserViewsContainer = (props) => {

  /**
   * If user object is not present. User is not authenticated,
   * so page is redirected to login
   */
  if (!props.user) {

    return (
      <div>
        <Redirect to="/login"/>
        <Route
          exact
          path="/login"
          render={() => (
            <ViewLogin {...props} />
          )}
        /> 
      </div>
    );

  }

  return(
    <section>
      <Route
        exact
        path="/login"
        render={() => (
          <Redirect to="/"/>
        )}
      />

      <Route
        path="/"
        exact={true}
        render={() => (
          <ViewMap {...props} />
        )}
      />

      <Route
        path="/around-us"
        exact={true}
        render={() => (
          <ViewTimeline {...props} displayExpiredItems={false} />
        )}
      />

      <Route
        path="/profile"
        exact={true}
        render={() => (
          <ViewProfile {...props} />
        )}
      />

      <Route
        path="/settings"
        exact={true}
        render={() => (
          <ViewSettings {...props} />
        )}
      />

      <Route
        path="/my-fancies"
        exact={true}
        render={() => (
          <ViewUserTimeline {...props} isMyFancies />
        )}
      />

      <Route
        path="/my-subscriptions"
        exact={true}
        render={() => (
          <ViewUserTimeline {...props} isMySubscriptions />
        )}
      />

      <Route
        path="/my-subscribers"
        exact={true}
        render={() => (
          <ViewUserTimeline {...props} isMySubscribers />
        )}
      />

      <Route
        path="/analytics"
        exact={true}
        render={() => (
          <ViewAnalytics {...props} isMySubscriptions />
        )}
      />

      <Route
        path="/terms-and-conditions"
        exact={true}
        render={() => (
          <ViewTermsAndConditions />
        )}
      />
    </section>
  );
};


const UserViews = withUser(UserViewsContainer);

export default UserViews;

