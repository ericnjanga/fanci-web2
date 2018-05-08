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
import modalStyle from './../../jsStyles/modal.styles.js';
import './UserMessageModal.css';


class UserMessageModal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('[UserMessageModal]>>>>=', this.props.post ); 
    // this.setState({ data:  v });
  }

  componentDidUpdate(prevProps, prevState, snapshot){ 
    console.log('>>>prevProps=', prevProps);
    // console.log('>>>prevProps.data=', prevProps.data);
    console.log('***prevState.data=', prevState);
    // if(prevState.data){ //must have a previous state
    //   // console.log('[componentDidUpdate]>>>> prevProps=', prevProps, ' - prevState=', prevState );


    //   console.log('[componentDidUpdate]>>>> prevState.data.title!==prevProps.data.title=', prevState.data.title,'!==',prevProps.data.title, '----', (prevState.data.title!==prevProps.data.title) );

    //   // console.log('[componentDidUpdate]>>>> prevState.data=', prevState.data); 
    //   // console.log('[componentDidUpdate]>>>> prevProps.data=', prevProps.data);
      
    //   if(prevState.data.title!==prevProps.data.title || prevState.data.file!==prevProps.data.file || prevState.data.content!==prevProps.data.content || 
    //     prevState.data.location!==prevProps.data.location || prevState.data.duration!==prevProps.data.duration || prevState.data.places!==prevProps.data.places){
    //     this.setState((prevState, props)=>{
    //       return { data: prevProps.data }
    //     });
    //   } 
    // }//must have a previous state
  }//[end] componentDidUpdate


  //Save info to post database, cleaniup state and hi demodal
  handleSubmit(event, user) {
    event.preventDefault(); 
    DBPost.save(this.state.data, user.uid).then((ready) => { 
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
    let data = this.state.data;
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
    data[name] = value;
    this.setState({ data }); 
  }//[end] handleChange

  render() {
    const p = {...this.props};  
    const style = {
      avatar: { 
        margin: 0,
        position: 'absolute', 
        top: '10px',
        left: '15px'
      }
    }; 
    return( 
      <Modal isOpen={p.data.active} toggle={p.toggle} className={'UserMessageModal'}> 
        <Figure img={p.user.photoURL} alt={p.user.displayName} style={style.avatar} avatar circle size="med" />
        {
          p.data.params && <div>
            <ModalHeader toggle={p.toggle} style={modalStyle.header}>{p.data.params.title}</ModalHeader>
            <ModalBody>
              <MessageForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} data={p.data.post} />
            </ModalBody>
            <ModalFooter style={modalStyle.footer}>
              <Button style={{...modalStyle.ctaBtn, ...modalStyle.btnNo}} color="secondary" onClick={p.toggle}>Cancel</Button>{' '}
              <Button style={{...modalStyle.ctaBtn, ...modalStyle.btnYes}} color="primary" onClick={(event)=>this.handleSubmit(event, p.user)}>{p.data.params.btnYes}</Button>
            </ModalFooter> 
          </div>
        }
      </Modal>
    ); 
  }
}

export default UserMessageModal;
