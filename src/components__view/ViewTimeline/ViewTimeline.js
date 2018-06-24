import React from 'react';
import List from './../../components__reusable/List/List.js';    
import ModalPostCreate from './../../components__widget/ModalPostCreate/ModalPostCreate.js';
import PostItem from './../../components__widget/PostItem/PostItem.js';
import PostItemPlaceholder from './../../components__widget/PostItemPlaceholder/PostItemPlaceholder.js'; 
import buttonStyle from './../../jsStyles/button.styles.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPencil from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import {Button } from 'reactstrap';
import ViewApp from './../ViewApp.js';
import DBPost from './../../utilities/DBPost.class.js';
import './ViewTimeline.css'; 


class ViewTimeline extends ViewApp {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleModal = this.toggleModal.bind(this);
  }


  /**
   * - prepare modal content (better detail later)
   * - Toggle modal active state
   * @param {*} ppt
   */
  toggleModal(ppt) {

    let modal = { ...this.state.modal };
    let formFields = {};
    if (ppt !== undefined && ppt.data && ppt.params) {

      modal.params = { ...ppt.params };
      formFields = { ...ppt.data };

    } else {

      modal.params = {
        ...this.getModalParams('create'),
      };
      formFields = {
        ...DBPost.getPostObject(),
      };

    }

    this.setState({ modal, formFields }, () => { // toggle modal when data is updated

      modal = { ...this.state.modal };
      modal.active = !this.state.modal.active;
      this.setState({ modal });

    });

  }// [end] toggleModal


  getModalParams(arg) {
    let params = {}; 
    let cta = arg[0].toUpperCase() + arg.substring(1);
    params.mode = arg;
    params.title = `${cta} Your Fanci!`;
    params.btnYes = `${cta}`;
    return params;
  }//end] getModalParams


  componentDidMount() {
    super.componentDidMount();//User ViewApp parent component 
    this.setState({
      modal: {
        active: false, 
        params: {//Create mode by default
          ...this.getModalParams('create') 
        },
      },
      formFields: {
        ...DBPost.data
      }
    });
  }// [end] componentDidMount
 

  render() {
    const p = { ...this.props}; 
    const s = { ...this.state};  
    const modalData = {
      ...s.modal,
      formFields: this.state.formFields
    }; 

    return ( 
      <div className="view__content ViewTimeline" style={{paddingTop:'20px' }}> 
        <Placeholders isVisible={!p.postList_runtime} />

        <List 
          items={p.postList_runtime} 
          itemComp={PostItem} 
          user={p.userProfile} 
          handleConfirmModal={p.handleConfirmModal} 
          confirmationModal={p.confirmationModal} 
          toggleTimelineModal={this.toggleModal} 
          itemStyle={{marginBottom:'20px' }} 
          displayExpiredItems={p.displayExpiredItems} 
        />  
        {
          s.modal && <div>
            <ModalPostCreate 
              user={p.userProfile} 
              data={modalData} 
              toggle={this.toggleModal} 
              className={this.props.className} 
            /> 
          </div>
        }
        
        <Button 
          style={buttonStyle.fab} 
          className="btn-search btn-fab" 
          color="secondary" 
          onClick={p.toggleSearchPanel}>
          <FontAwesomeIcon 
            style={buttonStyle.fabIcon} 
            icon={faSearch} 
          /> 
          <span className="sr-only">Search a Fanci</span> 
        </Button> 

        <Button 
          style={buttonStyle.fab}
          className="btn-post btn-fab"
          color="primary"
          onClick={this.toggleModal}>
          <FontAwesomeIcon
            style={buttonStyle.fabIcon}
            icon={faPencil}
          /> 
          <span className="sr-only">Write a Message</span> 
        </Button>  
      </div>
    );
  }// [end] render
}// [end] ViewTimeline

export default ViewTimeline;


/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */
const Placeholders = (props) => {
  if (!props.isVisible) return false;
  return (
    <div>
      <PostItemPlaceholder style={{marginBottom:'20px' }} />
      <PostItemPlaceholder style={{marginBottom:'20px' }} />
      <PostItemPlaceholder style={{marginBottom:'20px' }} />
      <PostItemPlaceholder />
    </div>
  )
}
/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */