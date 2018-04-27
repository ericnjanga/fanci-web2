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
          <h2>Login view</h2>
          <Button color="primary" onClick={props.onLogin}>
            <FontAwesomeIcon icon={faGoogle} />
            Login with Google
          </Button> 
        </Col>
      </Row>
    </Container>
  );
}//[end] Login

export default ViewLogin;