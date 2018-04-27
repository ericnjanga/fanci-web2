/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MessageForm from '../MessageForm/MessageForm';
import UserAvatar from '../UserAvatar/UserAvatar';
import DBPost from '../../utilities/DBPost.class.js';  
import './UserMessageModal.css';


class UserMessageModal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {  
      title:'',
      content: '' 
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Save info to post database, cleaniup state and hi demodal
  handleSubmit(event, user) {
    event.preventDefault();  
    DBPost.save(this.state, user.uid).then((ready) => { 
      //Cleanup form when post is successful ...
      this.setState((prevState, props) => {
        return {
          title: '',
          content: ''
        }
      }); 
    });
    this.props.toggle();
  }//[end] handleSubmit

  handleChange(event) { 
		this.setState({
			formDirty : true,
			[event.target.name] : event.target.value
		});
  }

  render() {
    const { user, isOpen, toggle } = this.props;
    const { title, content } = this.state; 
    return( 
      <Modal isOpen={isOpen} toggle={toggle} className={'UserMessageModal'}>
        <UserAvatar item={user} /> 
        <ModalHeader toggle={toggle}>Say somethig <b>{user.displayName}</b></ModalHeader>
        <ModalBody>
          <MessageForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} title={title} content={content} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(event)=>this.handleSubmit(event, user)}>Send your message</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    ); 
  }
}

export default UserMessageModal;