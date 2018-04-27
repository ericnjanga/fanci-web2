import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faGoogle from '@fortawesome/fontawesome-free-brands/faGoogle';
import './ViewLogin.css';


const ViewLogin = (props) => {
  return(
    <Container className="view--login">
      <Row>
        <Col>  
          <Button color="primary" onClick={props.onLogin}>
            <FontAwesomeIcon icon={faGoogle} />
            Login with Google
          </Button> 
          <p>
            <small>Chocolate cake danish chocolate lemon drops icing muffin fruitcake. 
              Toffee marshmallow oat cake chocolate cake cheesecake. Chocolate bar biscuit sesame snaps.</small>
          </p>
        </Col>
      </Row>
    </Container>
  );
}//[end] Login

export default ViewLogin;