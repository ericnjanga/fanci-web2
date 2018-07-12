import React from 'react';
import {Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import ViewApp from './../ViewApp.js';


class ViewLogin extends ViewApp {
  // constructor(props)
  render() {
    const styles = {
      body: {
        marginTop: '30%',
        textAlign: 'center'
      },
      p: {
        marginTop: '20px',
        lineHeight: '1rem' 
      }
    };

    console.log('...this.props=', this.props);

    return (
      <div 
        className="view--login" 
        style={styles.body}> 
        <Button 
          color="primary" 
          onClick={this.props.onLogin}>
          <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '20px' }} />
          Login with Google
        </Button> 
        <p style={styles.p}> 
          <small>Chocolate cake danish chocolate lemon drops icing muffin fruitcake. 
            Toffee marshmallow oat cake chocolate cake cheesecake.</small>
        </p>
      </div>  
    );
  }
}// [end] Login


export default ViewLogin;
