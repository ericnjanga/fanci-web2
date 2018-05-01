/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MessageForm from '../MessageForm/MessageForm';
import Figure from './../../components__reusable/Figure/Figure.js'; 
import DBPost from '../../utilities/DBPost.class.js';  
import DBUpload from './../../utilities/DBUpload.class.js';
import './UserMessageModal.css';


class UserMessageModal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {  
      title:'',
      file: '',
      content: '',
      location: '',
      duration: undefined,
      places : undefined
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
          file: '',
          content: '',
          location: '',
          duration: 0,
          places : 0
        }
      }); 
    });
    this.props.toggle();
  }//[end] handleSubmit

  handleChange(event) { 
    const name = event.target.name;
    //Will be input value or new File object
    let value = event.target.value;

    //For 'file' upload it right away on the fire storage
    //and save the name in the state for later use when post 
    //will be created
    if(name==='file') { 
      let newFile = event.target.files[0];
      value = 'timeline/'+newFile.name; 
      DBUpload.save(newFile); 
    } 
    //....
    this.setState({
      formDirty : true,
      [name] : value
    }); 
  }//[end] handleChange

  render() {
    const { user, isOpen, toggle } = this.props;
    const style = {
      avatar: { 
        margin: 0,
        position: 'absolute', 
        top: '10px',
        left: '15px'
      }
    }; 
    return( 
      <Modal isOpen={isOpen} toggle={toggle} className={'UserMessageModal'}> 
        <Figure img={user.photoURL} alt={user.displayName} style={style.avatar} avatar circle size="med" />
        <ModalHeader toggle={toggle}>Create your Fanci!</ModalHeader>
        <ModalBody>
          <MessageForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} {...this.state} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(event)=>this.handleSubmit(event, user)}>Post Your Fanci</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    ); 
  }
}

export default UserMessageModal;