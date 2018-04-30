/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Button, Modal, ModalBody, Form, FormGroup, Input } from 'reactstrap'; 
import DBPost from '../../utilities/DBPost.class.js';  
import './SearchModal.css';


class SearchModal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {  
      title:'',
      content: '',
      location: ''
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
		this.setState({
			formDirty : true,
			[event.target.name] : event.target.value
		});
  }

  render() {
    const { user, isOpen, toggle } = this.props;
    // const { title, content, location, duration, places } = this.state; 
    return( 
      <Modal isOpen={isOpen} toggle={toggle} className={'SearchModal'}>  
        <ModalBody>
          <Form>
            <FormGroup> 
              <Input type="text" name="fanci-search" id="fanci-search" placeholder="Search a Fanci" onChange={this.handleFilter} />
            </FormGroup> 
          </Form>
        </ModalBody> 
      </Modal>
    ); 
  }
}

export default SearchModal;