import React from 'react';
import UserMessageList from './../../components__widget/UserMessageList/UserMessageList.js'; 
import UserMessageModal from './../../components__widget/UserMessageModal/UserMessageModal.js';  
import Toast from './../../components__widget/Toast/Toast.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'; 
import { Button, Container, Row, Col } from 'reactstrap';
import Figure from './../../components__widget/Figure/Figure.js';
import DBPost from '../../utilities/DBPost.class.js'; 
import './ViewMessageBoard.css'; 
import img1 from './../../images/therock-1.jpeg'; 
 

class ViewMessageBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    /**
     * Fetch database records form 2 nodes (relationnal database style: listA and listB)
     * Fetch all elements of listA and for each element of listA:
     * -> find the corresponding element in list B, join it to A and save it into a final list
     */
    DBPost.getNode().on('value', (snapshot) => {
      //Get data (iterable object)
      const nodeVal = snapshot.val(); 
      const postMap = new Map(Object.entries(nodeVal));
      //push values in a regular array
      let itemsList = [];
      postMap.forEach((value, key)=>{
        let post = Object.assign({}, value);
        post.id = key;
        itemsList.push(post);
      });
      //save reverse array in state (most recent posts first)
      this.setState({
        itemsList: itemsList.reverse()
      }); 
    });//[end] within nodeRef_A  
  }//[edn] componentDidMount
 
  render() {
    const { user } = this.props; 
    const { itemsList } = this.state; 
    return(
      <Container className="view__content ViewMessageBoard"> 
        <Row>
          <Col> 
            <Figure img={img1} alt={'The Rock'} caption={'The Rock (Dwayne Johnson), getty images'} /> 

            { /* Display a toast if the list of items is not yet ready */
              !itemsList ? <Toast msg={'Fetching data'} /> : <UserMessageList items={itemsList} />
            }

            <UserMessageModal user={user} isOpen={this.state.modal} toggle={this.toggle} 
            className={this.props.className} />
          
            <Button color="primary" onClick={this.toggle}>
              <FontAwesomeIcon icon={faPencil} /> 
              <span>Write a Message</span> 
            </Button> 
          </Col>
        </Row>
      </Container>
    ); 
  }
}

export default ViewMessageBoard;