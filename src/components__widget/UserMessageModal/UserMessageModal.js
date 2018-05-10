/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import MessageForm from '../MessageForm/MessageForm';
import Figure from './../../components__reusable/Figure/Figure.js'; 
import DBPost from '../../utilities/DBPost.class.js';  
import DBUpload from './../../utilities/DBUpload.class.js';
import AppDoc from './../../utilities/AppDoc.class.js';
import modalStyle from './../../jsStyles/modal.styles.js';
import formStyle from './../../jsStyles/form.styles.js';
import './UserMessageModal.css';


class UserMessageModal extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      postFormFields : {
        ...DBPost.getPostObject()
      },
      // post : {
      //   file: ''
      // }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log('[UserMessageModal]>>>>componentDidMount' ); 
    // this.setState({ data:  v });
  }

  componentDidUpdate(prevProps, prevState, snapshot){ 
    console.log('[UserMessageModal]>>>>componentDidUpdate');
    // // console.log('>>>prevProps.data=', prevProps.data);
    // console.log('***prevState.data=', prevState);
    // let post = prevProps.data.post;

    // if(prevState.post){ //must have a previous state
      
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
    //transfert post data to temporary object and cleanup file path
    let finalPost = { ...this.state.postFormFields };
    //Make sure file is saved in "timeline" folder ...
    //(only if "file" has been provided)
    if(finalPost.file){ 
      finalPost.file = finalPost.file.replace(/C:\\fakepath\\/, ''); 
      finalPost.file = 'timeline/'+finalPost.file;
    }
    //Save post
    DBPost.save(finalPost, user.uid)
    //Reset "postFormFields" state object once its done
    .then((ready) => {  
      let postFormFields = { ...DBPost.getPostObject() };
      //Cleanup form when post is successful ...
      this.setState((prevState, props) => {
        return { postFormFields }
      }); 
    });
    this.props.toggle();
  }//[end] handleSubmit

  handleChange(event) { 
    let postFormFields = this.state.postFormFields;
    const name = event.target.name;
    //Will be input value or new File object  
    let value = event.target.value;
    // console.log(name+' - '+value);

    //For 'file' upload it right away on the fire storage
    //and save the name in the state for later use when post 
    //will be created
    if(name==='file') { 
      let newFile = event.target.files[0]; 
      DBUpload.save(newFile); 
    } 
    //....
    postFormFields[name] = value;
    this.setState({ postFormFields }); 
  }//[end] handleChange

  render() {
    const p = {...this.props};  
    const s = {...this.state};
    const style = {
      avatar: { 
        margin: 0,
        position: 'absolute', 
        top: '10px',
        left: '15px'
      }
    }; 
    
    return( 
      <Modal isOpen={p.data.active} toggle={p.toggle} className={'UserMessageModal'} backdrop={'static'}>
        <Figure img={p.user.photoURL} alt={p.user.displayName} style={style.avatar} avatar circle size="med" />
        {
          p.data.params && <div>
            <ModalHeader toggle={p.toggle} style={modalStyle.header}>{p.data.params.title}</ModalHeader>
            <ModalBody> {/* post={p.data.postFormFields} file={s.post.file} */}
              <MessageForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} post={s.postFormFields} />
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

/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */


const MessageForm = (props) => {
  const { handleSubmit, handleChange, post} = props; 
  const s = formStyle;
  const fields = new Map(Object.entries(DBPost.formFields)); 
  let formFields = []; 

  fields.forEach((value, key)=>{ 
    let inputStyle = s[key]?s[key].input:{},
        tmpVal = value.formField.placeholder;
    formFields.push(
      <FormGroup key={key}>
        <Label className={s[key]?s[key].className:''} for={key} style={s.label}>
          <IconLabel value={value} /> {' '}
          <TexTLabelFileInput type={key} value={post.file} tmpText={value.label.text} />
          <TexTLabelOtherInput type={key} value={value.label.text} /> 
        </Label>

        <SelectInput type={value.formField.type} ident={key} style={inputStyle} 
        placeholder={tmpVal} onChange={handleChange} value={post[key]} options={value.formField.options} />

        <OtherInput type={value.formField.type} ident={key} style={inputStyle} 
        placeholder={tmpVal} onChange={handleChange} value={post[key]} />
 
        
        {/*
          value.formField.type!=='select' ?
          <Input style={s[key]?s[key].input:{}} type={value.formField.type} name={key} id={key} placeholder={value.formField.placeholder} onChange={handleChange} value={post[key]} />
           
          */} 
      </FormGroup> 
    ); 
  });

  return(
    <Form onSubmit={handleSubmit}>
      { formFields.map((field)=> field) }
    </Form>
  );
}
const IconLabel = (props) => {
  let icon = props.value.label.icon;
  if(!icon) return false;
  return icon;
}

const TexTLabelFileInput = (props) => {
  let type = props.type, 
    value = props.value,
    placeholder = props.tmpText;
  if(type!=='file') return false;
  //Display only filename or placeholder   
  return (value==='')?placeholder:value.replace(/C:\\fakepath\\/, '');
}

const TexTLabelOtherInput = (props) => {
  let type = props.type, value = props.value;
  if(type=='file') return false;
  return value;
}

const SelectInput = (props) => {
  /*
  
  <Input style={s[key]?s[key].input:{}} type={value.formField.type} name={key} 
  id={key} placeholder={value.formField.placeholder} onChange={handleChange} value={post[key]} />
  */
  let {type, value, ident, style, placeholder, onChange, options } = props; 
  if(type!=='select') return false;
  return(
    <Input type={type} name={ident} id={ident} style={style} onChange={onChange} value={value}>
      <option>{placeholder}</option>
      {
        options.map((option)=>{
          return <option key={option.val} value={option.val}>{option.label}</option>
        })
      }
    </Input>
  );
}

const OtherInput = (props) => {
  let {type, value, ident, style, placeholder, onChange, options } = props; 
  if(type==='select') return false;
  return(
    <Input 
    type={type} 
    name={ident} 
    id={ident} 
    style={style} 
    onChange={onChange} 
    value={value} 
    placeholder={placeholder} />
  );
}
/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */