import React from 'react';
import List from './../../components__reusable/List/List.js';     
import PostItem from './../../components__widget/PostItem/PostItem.js'; 
import PostItemPlaceholder from './../../components__widget/PostItemPlaceholder/PostItemPlaceholder.js';  
import UserMessageModal from './../../components__widget/UserMessageModal/UserMessageModal.js'; 
import buttonStyle from './../../jsStyles/button.styles.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'; 
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import { Button } from 'reactstrap';
import ViewApp from './../ViewApp.js';
// import DBUpload from './../../utilities/DBUpload.class.js';
import DBPost from './../../utilities/DBPost.class.js';
import './ViewTimeline.css';  


class ViewTimeline extends ViewApp {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleModal = this.toggleModal.bind(this); 
  }

 
 
  
  /**
   * Toggle "timeline" modal visibility and update fanciData either with : 
   * -> Data coming from selected component (for editing purposes)
   * -> Or data coming from default state (for creation purposes)
   */
  toggleModal(ppt) {
    let timeline; //fanciData, params; 
    if(ppt!==undefined && ppt.data && ppt.params){
      timeline = {};
      timeline.postFormFields = ppt.data;
      timeline.params = ppt.params; 
    }
    else{
      timeline = this.state.timeline;
      timeline.params = {
        mode: 'create',
        title: 'Create Your Fanci!',
        btnYes: 'Create'
      };
      timeline.postFormFields = {
        ...DBPost.getPostObject()
      };  
    }
    this.setState({ timeline }, ()=>{//toggle modal when data is updated
        let timeline = this.state.timeline;
        timeline.active = !timeline.active;
      this.setState({ timeline }); 
    }); 
  } 

  componentDidMount() { 
    super.componentDidMount(); //User ViewApp parent component 
    this.setState({
      timeline: {
        active: false,
        params : {//Create mode by default
          mode: 'create',
          title: 'Create Your Fanci!',
          btnYes: 'Create'
        },
        post : {
          ...DBPost.data
        }
      }
    });
    // this.initState(); 
  }//[edn] componentDidMount
 
  render() {
    const p = {...this.props}; 
    const s = {...this.state};  

    return(  
      <div className="view__content ViewTimeline" style={{ paddingTop:'20px' }}>  
        { /* Display a toast if the list of items is not yet ready */  
          !p.postList_runtime ? 
          <div>
            <PostItemPlaceholder style={{ marginBottom:'20px' }} />
            <PostItemPlaceholder style={{ marginBottom:'20px' }} />
            <PostItemPlaceholder style={{ marginBottom:'20px' }} />
            <PostItemPlaceholder />
          </div>
          : 
          <List items={p.postList_runtime} itemComp={PostItem} 
          user={p.user} handleConfirmModal={p.handleConfirmModal} confirmationModal={p.confirmationModal} 
          toggleTimelineModal={this.toggleModal} itemStyle={{ marginBottom:'20px' }} />    
        } 

        { //data={s.fanciData} params={s.timeline.params}
          s.timeline && <UserMessageModal user={p.user} data={s.timeline} toggle={this.toggleModal} 
          className={this.props.className} />
        }
        
        <Button style={buttonStyle.fab} className="btn-search btn-fab" color="secondary" onClick={p.toggleSearchPanel}>
          <FontAwesomeIcon style={buttonStyle.fabIcon} icon={faSearch} /> 
          <span className="sr-only">Search a Fanci</span> 
        </Button> 

        <Button style={buttonStyle.fab} className="btn-post btn-fab" color="primary" onClick={this.toggleModal}>
          <FontAwesomeIcon style={buttonStyle.fabIcon} icon={faPencil} /> 
          <span className="sr-only">Write a Message</span> 
        </Button>  
      </div>
    ); 
  }
}

export default ViewTimeline;