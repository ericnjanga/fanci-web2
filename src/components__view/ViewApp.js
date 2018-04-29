/**
 * Component that implements a couple of highlevel methods 
 * and is inherited by sub-views 
 * - Method1: handleRouteChange (top level method)
 */
import React from 'react';  

class ViewApp extends React.Component {

  componentDidMount(){  
    const handleRouteChange = this.props.onRouteChange; 
    if(handleRouteChange){
      handleRouteChange();
    }
  }
  render(){
    return(
      <div>
        {this.props.children}
      </div>
    ); 
  }
}

export default ViewApp;