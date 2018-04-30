import React from 'react';
import UserMessageList from './../../components__widget/UserMessageList/UserMessageList.js'; 
import UserMessageModal from './../../components__widget/UserMessageModal/UserMessageModal.js'; 
import SearchModal from './../../components__widget/SearchModal/SearchModal.js';  
import Toast from './../../components__widget/Toast/Toast.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'; 
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import { Button, Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import Figure from './../../components__widget/Figure/Figure.js';
import DBPost from '../../utilities/DBPost.class.js'; 
import ViewApp from './../ViewApp.js';
import './ViewAroundUs.css';  
 

class ViewAroundUs extends ViewApp {
  constructor(props) {
    super(props);
    this.state = {
      timelineModal: false,
      searchModal: false,
      origItemsList: null
    }
    this.toggleTimelineModal = this.toggleTimelineModal.bind(this);
    this.toggleSearchModal = this.toggleSearchModal.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }


  /**
   * Uptimize the 2 functions when it works
   */
  toggleTimelineModal() {
    this.setState({
      timelineModal: !this.state.timelineModal
    });
  } 
  toggleSearchModal() {
    this.setState({
      searchModal: !this.state.searchModal
    });
  }
  /**
   * Uptimize the 2 functions when it works
   */

  //Filter the original list of fancies against user search input
  //and updatge the state with the resulting array
  handleFilter(event) {
    let searchVal = event.target.value;
    let list = this.state.origItemsList; 
    let itemsList = list.filter((item)=>{  
      return item.title.toLowerCase().search(searchVal) > -1;
    }); 
    this.setState({ itemsList });
  }

  componentDidMount() { 
    super.componentDidMount(); //User ViewApp parent component
    /**
     * Fetch database records form 2 nodes (relationnal database style: listA and listB)
     * Fetch all elements of listA and for each element of listA:
     * -> find the corresponding element in list B, join it to A and save it into a final list
     */
    DBPost.getNode().on('value', (snapshot) => { 
      const nodeVal = snapshot.val(); 
      let itemsList = []; 
      if(nodeVal){ //Avoid error if there is no DB objects
        const postMap = new Map(Object.entries(nodeVal)); 
        postMap.forEach((value, key)=>{
          let post = Object.assign({}, value);
          post.id = key;
          //push values in a regular array 
          itemsList.push(post); 
          itemsList = itemsList.reverse(); //Reverse array (most recent posts first) 
        });
      } 
      //save array in state
      this.setState({ itemsList }); 
      this.setState({ origItemsList:itemsList }); 
      
    });//[end] within nodeRef_A  
  }//[edn] componentDidMount
 
  render() {
    const { user } = this.props; 
    const { itemsList } = this.state; 
    return(
      <Container className="view__content ViewAroundUs"> 
        <Row className="frame-search">
          <Col>
          <Form>
            <FormGroup> 
              <Input type="text" name="fanci-search" id="fanci-search" placeholder="Search a Fanci" onChange={this.handleFilter} />
            </FormGroup> 
          </Form>
          </Col>
        </Row>
        <Row>
          <Col>   
            { /* Display a toast if the list of items is not yet ready */
              !itemsList ? <Toast msg={'Fetching data'} /> : <UserMessageList items={itemsList} /> 
            } 
            <UserMessageModal user={user} isOpen={this.state.timelineModal} toggle={this.toggleTimelineModal} 
            className={this.props.className} />

            <SearchModal isOpen={this.state.searchModal} toggle={this.toggleSearchModal} 
            className={this.props.className} />
          
            <Button className="btn-search btn-fab" color="secondary" onClick={this.toggleSearchModal}>
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