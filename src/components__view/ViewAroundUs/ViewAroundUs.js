import React from 'react';
import List from './../../components__reusable/List/List.js';     
import UserMessage from './../../components__widget/UserMessage/UserMessage.js';  
import UserMessageModal from './../../components__widget/UserMessageModal/UserMessageModal.js'; 
import Toast from './../../components__reusable/Toast/Toast.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'; 
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import { Button, Container, Row, Col } from 'reactstrap';
import ViewApp from './../ViewApp.js';
import DBUpload from './../../utilities/DBUpload.class.js';
import './ViewAroundUs.css';  
 

class ViewAroundUs extends ViewApp {
  constructor(props) {
    super(props);
    this.state = {
      timelineModal: false,
    }
    this.toggleTimelineModal = this.toggleTimelineModal.bind(this);
  }


  /**
   * Uptimize the 2 functions when it works
   */
  toggleTimelineModal() {
    this.setState({
      timelineModal: !this.state.timelineModal
    });
  }  

  componentDidMount() { 
    super.componentDidMount(); //User ViewApp parent component  
  }//[edn] componentDidMount
 
  render() {
    const p = {...this.props};  
    return(
      <Container className="view__content ViewAroundUs">
        <Row>
          <Col>   
            { /* Display a toast if the list of items is not yet ready */
              !p.list ? <Toast msg={'Fetching data'} /> : <List items={p.list} item={UserMessage} /> 
            } 
            <UserMessageModal user={p.user} isOpen={this.state.timelineModal} toggle={this.toggleTimelineModal} 
            className={this.props.className} />
          
            <Button className="btn-search btn-fab" color="secondary" onClick={p.toggleSearchPanel}>
              <FontAwesomeIcon icon={faSearch} /> 
              <span className="sr-only">Search a Fanci</span> 
            </Button> 
          
            <Button className="btn-post btn-fab" color="primary" onClick={this.toggleTimelineModal}>
              <FontAwesomeIcon icon={faPencil} /> 
              <span className="sr-only">Write a Message</span> 
            </Button> 
          </Col>
        </Row>
      </Container>
    ); 
  }
}

export default ViewAroundUs;