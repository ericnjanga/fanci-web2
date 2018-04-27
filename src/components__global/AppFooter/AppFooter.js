import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './AppFooter.css';

const AppFooter = (props) => {
  return(
    <footer className="AppFooter">
      <Container>
        <Row>
          <Col>
            <p><Link to={`/terms-and-cnditions`}>Terms &amp; Conditions</Link></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default AppFooter;