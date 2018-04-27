import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Figure from './../../components__widget/Figure/Figure.js';
// import './ViewHome.css';  
import img1 from './../../images/therock-4.jpg'; 


const ViewHome = () => {
  return(
    <Container className="view__content">
      <Row>
        <Col>
          <h2>Home view</h2> 
          <Figure img={img1} alt={'The Rock'} caption={'The Rock (Dwayne Johnson), getty images'} /> 
          <p>Biscuit pudding cupcake toffee dessert pastry. Muffin marshmallow chocolate bar. Dragée apple pie halvah pastry dessert jelly beans. Apple pie apple pie pie halvah cupcake marshmallow.</p>
          <p>Icing cake candy sugar plum pastry biscuit cake icing carrot cake. Croissant icing sesame snaps croissant candy marshmallow ice cream. Tiramisu cake toffee cheesecake jelly jelly-o sesame snaps pastry pie.</p>
          <p>Chupa chups bear claw tiramisu. Topping sweet topping muffin cupcake fruitcake danish. Caramels dessert toffee pudding marzipan. Pie danish tart cake.</p>
          <p>Biscuit pudding cupcake toffee dessert pastry. Muffin marshmallow chocolate bar. Dragée apple pie halvah pastry dessert jelly beans. Apple pie apple pie pie halvah cupcake marshmallow.</p>
          <p>Icing cake candy sugar plum pastry biscuit cake icing carrot cake. Croissant icing sesame snaps croissant candy marshmallow ice cream. Tiramisu cake toffee cheesecake jelly jelly-o sesame snaps pastry pie.</p>
          <p>Chupa chups bear claw tiramisu. Topping sweet topping muffin cupcake fruitcake danish. Caramels dessert toffee pudding marzipan. Pie danish tart cake.</p>
        </Col>
      </Row>
    </Container>
  );
}//[end] Home

export default ViewHome;