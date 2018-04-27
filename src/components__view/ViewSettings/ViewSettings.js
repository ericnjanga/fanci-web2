import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Figure from './../../components__widget/Figure/Figure.js'; 
import ViewApp from './../ViewApp.js';
// import './ViewSettings.css';  
import img1 from './../../images/therock-5.jpeg'; 


class ViewSettings extends ViewApp {
  render () {
    return(
      <Container className="view__content">
        <Row>
          <Col>
            <h2>About view</h2> 
            <Figure img={img1} alt={'The Rock'} caption={'The Rock (Dwayne Johnson), getty images'} />
            <p>Gummi bears jelly beans chocolate cake marzipan muffin. Halvah cupcake fruitcake apple pie ice cream gingerbread chupa chups sweet. Tiramisu liquorice cheesecake tiramisu.</p>
            <p>Bear claw liquorice ice cream sugar plum cheesecake cotton candy pastry topping. Carrot cake fruitcake lollipop apple pie cheesecake. Jelly-o lemon drops brownie caramels. Candy canes cookie soufflé cookie cake tiramisu.</p>
            <p>Cupcake bear claw chupa chups caramels. Jelly beans soufflé cake cake lollipop chocolate cake chocolate cake tootsie roll. Gummi bears muffin macaroon halvah sesame snaps.</p>
          </Col>
        </Row>
      </Container>
    );
  }
}//[end] About

export default ViewSettings;