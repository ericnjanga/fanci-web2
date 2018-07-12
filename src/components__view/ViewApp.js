/**
 * Component that implements a couple of highlevel methods
 * and is inherited by sub-views
 * - Method1: handleRouteChange (top level method)
 */
import React from 'react';
import PropTypes from 'prop-types';

class ViewApp extends React.Component {

  componentDidMount() {

    const handleRouteChange = this.props.onRouteChange;
    if (handleRouteChange) {

      handleRouteChange();

    }

  }

  render() {

    return (
      <div>
        {this.props.children}
      </div>
    );

  }
}// [end] ViewApp


/**
 * Type checking to make sure data received is valid
 * (will throw an error if data received doesn't match the type or is not listed here)
 */
ViewApp.propTypes = {

  onRouteChange: PropTypes.func,  
  children: PropTypes.any,

};

export default ViewApp;