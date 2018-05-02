import React from 'react';
import List from './../../components__reusable/List/List.js';     
import UserMessage from './../../components__widget/UserMessage/UserMessage.js';  
import UserMessageModal from './../../components__widget/UserMessageModal/UserMessageModal.js'; 
import buttonStyle from './../../jsStyles/button.styles.js';
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
      fanciData: { 
        title:'',
        file: '',
        content: '',
        location: '',
        duration: undefined,
        places : undefined
      }
    }
    this.toggleTimelineModal = this.toggleTimelineModal.bind(this); 
  }

  
  /**
   * Toggle "timeline" modal visibility and update fanciData either with : 
   * -> Data coming from selected component (for editing purposes)
   * -> Or data coming from default state (for creation purposes)
   */
  toggleTimelineModal(params) {
    let fanciData;
    console.log('>>>>toggleTimelineModal - data=',params)
    if(params!==undefined && params.data){
      fanciData = params.data; 
    }else{
      fanciData = this.state.fanciData;
    }
    this.setState({ fanciData }, 
      ()=>{//toggle modal when data is updated
      this.setState({ timelineModal: !this.state.timelineModal });
      // console.log('[callback] -- state updated', this);
    });
  } 

  componentDidMount() { 
    super.componentDidMount(); //User ViewApp parent component  
  }//[edn] componentDidMount
 
  render() {
    const p = {...this.props}; 
    const s = {...this.state};  

    return(
      <Container className="view__content ViewAroundUs">
        <Row>
          <Col> 
            { /* Display a toast if the list of items is not yet ready */  
              !p.fanciList ? <Toast msg={'Fetching data'} /> : <List items={p.fanciList} itemComp={UserMessage} 
              user={p.user} handleConfirmModal={p.handleConfirmModal} confirmModal={p.confirmModal} 
              toggleTimelineModal={this.toggleTimelineModal}/>
            } 

            <UserMessageModal user={p.user} isOpen={s.timelineModal} toggle={this.toggleTimelineModal} 
            className={this.props.className} data={s.fanciData} />

            <Button style={buttonStyle.fab} className="btn-search btn-fab" color="secondary" onClick={p.toggleSearchPanel}>
              <FontAwesomeIcon style={buttonStyle.fabIcon} icon={faSearch} /> 
              <span className="sr-only">Search a Fanci</span> 
            </Button> 

            <Button style={buttonStyle.fab} className="btn-post btn-fab" color="primary" onClick={this.toggleTimelineModal}>
              <FontAwesomeIcon style={buttonStyle.fabIcon} icon={faPencil} /> 
              <span className="sr-only">Write a Message</span> 
            </Button> 
          </Col>
        </Row>
      </Container>
    ); 
  }
}

export default ViewAroundUs;