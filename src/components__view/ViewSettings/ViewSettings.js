import React from 'react';
import { Container, Row, Col } from 'reactstrap'; 
import ViewApp from './../ViewApp.js';
// import './ViewSettings.css';  
// import img1 from './../../images/therock-5.jpeg'; 


class ViewSettings extends ViewApp {
  render () {
    return(
      <Container className="view__content">
        <Row>
          <Col>
            <h2>Settings</h2>  
            <p>Settings coming soon.</p>
          </Col>
        </Row>
      </Container>
    );
  }
}//[end] About

export default ViewSettings;