/**
 * Returns a component that consumes UserContext
 */
import React from 'react';
import { UserContext } from './../services/services-init.js';

const withUser = (WrappedComponent) => {

  function getDisplayName(Component) {

    return Component.displayName || Component.name || 'Component';

  }

  withUser.displayName = `withUser(${getDisplayName(WrappedComponent)})`;

  // Returns new component
  return class extends React.Component {

    constructor(props) {
      super(props);
    }
    render() {
      return(
        <UserContext.Consumer>
          { 
            user => (
              <WrappedComponent user={user} {...this.props} />
            )
          }
        </UserContext.Consumer>
      );
    }
  };
};

export default withUser;
