import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Figure from './../../components__widget/Figure/Figure.js'; 
import ViewApp from './../ViewApp.js';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import './ViewSearch.css';  
import img1 from './../../images/therock-5.jpeg'; 


class ViewSearch extends ViewApp {
  render () {
    return(
      <Container className="view__content">
        <Row>
          <Col>
           
            <Form>
              <FormGroup>
                <Label for="search">Search</Label>
                <Input type="text" name="search" id="search" placeholder="Search for a Fanci" />
              </FormGroup>    
            </Form>

          </Col>
        </Row>
      </Container>
    );
  }
}//[end] About

export default ViewSearch;