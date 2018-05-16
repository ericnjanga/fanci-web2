/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Button, Card, CardText, CardBody, CardTitle, CardFooter } from 'reactstrap'; 
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Alert } from 'reactstrap';
import { dropdownSyles } from './../../jsStyles/menu.styles.js';  
import Toast from './../../components__reusable/Toast/Toast.js';  
import ModalPostEdit from './../../components__widget/ModalPostEdit/ModalPostEdit.js'; 
import PostItemStyle from './../../jsStyles/PostItem.styles.js';
import DBUser from '../../utilities/DBUser.class.js';  
import DBUpload from './../../utilities/DBUpload.class.js';
import DBPost from './../../utilities/DBPost.class.js';
import Figure from './../../components__reusable/Figure/Figure.js'; 
import modalStyle from './../../jsStyles/modal.styles.js';
import formStyle from './../../jsStyles/form.styles.js';
import DateFormat from './../../components__reusable/DateFormat.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome';  
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import faEllipsisH from '@fortawesome/fontawesome-free-solid/faEllipsisH';
import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import './PostItem.css';


class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user            : null,
      dropdownOpen    : false,
      postDeleteRequested  : false,
      canBeEdited     : false,
      modalEM         : false, 
      postFormFields  : {},
      postFormHiddenFields : {
        file : ''
      },
      postFormValidity : {
        title     : true,
        location  : true,
        content   : true,
      },
      postFormErrors : {
        title     : null,
        location  : null,
        content   : null,
        expiry    : null,
        places    : null
      },
      postFormMinCars : {
        title     : 10,
        location  : 4,
        content   : 30,
      },
      postFormIsValid   : true, //Post is valid by default because data is coming from a post
      postFormIsFrozen  : false 
    }
    this.handleEdit     = this.handleEdit.bind(this);
    this.toggleEM       = this.toggleEM.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleChange   = this.handleChange.bind(this);
    this.oPenConfirmRemoveModal = this.oPenConfirmRemoveModal.bind(this);
  }

  
  /**
   * Save form data in the database
   * Cleanup form and modal
   * Dismiss modal
   * @param {*} event 
   * @param {*} user 
   */
  handleSubmit(event, postID) {
    event.preventDefault();
    this.freezeForm(true);  
    // let finalPost = this.getReadyPostObject(this.state.postFormFields); //No need to get the post ready
    console.log('+++++=this.state.postFormFields=', this.state.postFormFields);
    //Update post
    // DBPost.save(finalPost, user.uid)
    // DBPost.update(postID, finalPost)
    // //Reset "postFormFields" state object once its done
    // .then((ready) => {  
    //   this.clearModal();
    //   this.freezeForm(false);
    //   this.props.toggle();
    // });
  }//[end] handleSubmit




  /**
   * - Unfreeze all fields
   * - Display overlay (z-index higher than everything inside modal except 'cancel' button)
   */ 
  freezeForm(bool){
    this.setState({ postFormIsFrozen:bool });
  }

  /**
   * Use event.target to update the form property name and value
   * If target is a 'file' input, save value in "Firebase Storage"
   * @param {*} event 
   */
  handleChange(event) { 
    let postFormFields = this.state.postFormFields;
    const name = event.target.name;
    //Will be input value or new File object  
    let value = event.target.value;

    //For 'file' upload it right away on "Firebase Storage"
    //and save the name in the state for later use when post 
    //will be created
    if(name==='file') { 
      let newFile = event.target.files[0]; 
      DBUpload.save(newFile); 
    } 
    //....
    postFormFields[name] = value;
    this.setState({ postFormFields }, ()=>{
      this.validateField(name, value);
    }); 
  }//[end] handleChange

  /**
   * Validate any form field (only title, location and content for now).
   * Update state on field 'error status' and 'validity'
   * @param {*} name 
   * @param {*} value 
   */
  validateField(name, value) { 
    if(name==='title' || name==='location' || name==='content'){
      let postFormErrors = {...this.state.postFormErrors},
      postFormValidity = {...this.state.postFormValidity},
      postFormMinCars = {...this.state.postFormMinCars};

      let minCars = postFormMinCars[name],
          fieldValue = value.trim();
      postFormValidity[name] = fieldValue.length >= minCars;
      postFormErrors[name] = postFormValidity[name] ? null : `${name} is too short, ${(minCars - fieldValue.length)} chars left`; 
    
      this.setState({postFormErrors, postFormValidity}, ()=>{
        this.validateForm(postFormValidity);
      });
    }//[end]...
  }

  /**
   * Find-out if all fields are valid and update the state property on form validity status
   * @param {*} postFormValidity 
   */
  validateForm(postFormValidity) { 
    const validObj = new Map(Object.entries(postFormValidity)); 
    const validValues = Array.from(validObj.values()); 
    let postFormIsValid = validValues.find((item)=>{ return item===false}); 
    postFormIsValid = (postFormIsValid===undefined)?true:false;

    // console.log('postFormFields=',postFormFields);

    this.setState({ postFormIsValid }); 
  } 

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleEM() {
    this.setState({
      modalEM: !this.state.modalEM
    });
  }

  /**
   * Define 'timeline modal' parameters before toggling it
   * @param {*} postID 
   */
  handleEdit(postID) {
    const p = {...this.props};
    const params = {
      mode: 'edit',
      title: 'Edit Your Fanci!',
      btnYes: 'Update'
    };
    this.toggleEM();

    let postFormFields = {...p.data}; 
    //Save file value in a hidden field for now (non-empty value cannpt be saved in the "file" input)
    let postFormHiddenFields = {
      file: p.data.file
    };
    postFormFields.file = '';


    console.log('postFormFields=',postFormFields);
    this.setState({ postFormFields, postFormHiddenFields });

    // p.toggleTimelineModal({ data:p.data, params });
  }


  //Open confirmation modal to see if this post can be deleted
  oPenConfirmRemoveModal(postID) {
    let meta = {
      active: true,
      title: 'Fanci Delete', 
      content : ()=> {
        return(
          <Alert color="danger" style={{marginBottom:0}}>
            <FontAwesomeIcon icon={faExclamationTriangle} /> {' '}
            Are you sure you want to delete this fanci?
          </Alert>
        )
      }
    };
    this.props.handleConfirmModal(null, meta);
    this.setState({ postDeleteRequested:true }); 
  }//[end] oPenConfirmRemoveModal

  
  /**
   * 1) Fetch user data
   * 2) Fetch post image information
   */
  componentDidMount() {
    const { uid, file } = this.props.data; 
    DBUser.get(uid).then((user) => {
      this.setState({ user });
    }); 
    if(file) {  
      console.log('>>>>file=',file);
      DBUpload.getFile(file).then((imgUrl) => {  
        this.setState({ imgUrl:imgUrl });
      });
    }
  } 

  
  componentDidUpdate(){
    const s = this.state;
    const p = this.props;
    //Trigger 'post deletion process' if request has been made and confirmed
    if(s.postDeleteRequested && p.confirmationModal.agreed){
      this.handleDelete(p.data.id, p.data.file); 
    }
  } 


  /**
   * Delete post and related image
   * @param {*} postID 
   * @param {*} fileLocation 
   */
  handleDelete(postID, fileLocation) {  
    DBPost.remove(postID)//Delete post
    .then(()=>{//then set confirm modal with new params
      let meta = {
        active: false, //inactive
        agreed:false //consent to 'NO'
      };
      //Apply params
      this.props.handleConfirmModal(null, meta);
    });
    if(fileLocation){
      DBUpload.remove(fileLocation);
    }
  }//[end] handleDelete


  render() {
    const s = {...this.state}; 
    const p = {...this.props};  
    let style = {
      avatar: { 
        margin: 0,
        position: 'absolute', 
        top: '10px',
        left: '15px'
      },
      btnCancel: {
        ...modalStyle.ctaBtn,
        ...modalStyle.btnNo,
        //Make sure cancel button is always supperior than inner <Toast />
        position: 'relative',
        zIndex: '1100' 
      },
      btnSubmit: {
        ...modalStyle.ctaBtn, 
        ...modalStyle.btnYes
      }
    }; 

    return(  
      <div>
        <Card className="PostItem" style={p.style}>
              { /*console.log('>>>>>>>>>>p.data=',p.data)*/ }
          <DisplayUserMenu userID={p.loggedUserID} data={p.data} isActive={this.state.dropdownOpen} style={dropdownSyles}
          handleToggle={this.toggleDropdown} handleEdit={this.handleEdit} openConfirm={this.oPenConfirmRemoveModal} />

          <DisplayUserAvatar data={s.user} style={PostItemStyle.avatar} />

          <header style={PostItemStyle.header}> 
            <CardTitle style={PostItemStyle.header_title}>{p.data.title}</CardTitle> 
            <small className="PostItem__date">
              <DateFormat millisec={p.data.date} />
            </small>
          </header>
  
          <DisplayPostIMage src={s.imgUrl} alt={p.data.title} />
          
          <CardBody style={PostItemStyle.cardBody}>   
            <CardText>{p.data.content}</CardText> 
          </CardBody> 

          <DisplayFooter data={p.data} />
        </Card>   

        { 
          <div>
            <Modal isOpen={this.state.modalEM} toggle={this.toggleEM} className={'ModalPost'} backdrop={'static'}> 
              { /*console.log('>>>>>>>>>>',s.user)*/ }
              { s.user && <Figure img={s.user.photoURL} alt={s.user.displayName} style={style.avatar} avatar circle size="med" /> }
              <ModalHeader style={modalStyle.header} toggle={this.toggleEM}>Edit Your Fanci!</ModalHeader>
              <ModalBody>
                <MessageForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} state={s}/>
              </ModalBody>
              <ModalFooter style={modalStyle.footer}>
                <Button style={style.btnCancel} color="secondary" onClick={this.toggleEM}>Cancel</Button>{' '} 
                <Button style={style.btnSubmit} color="primary" onClick={(event)=>this.handleSubmit(event, p.data.id)} disabled={!s.postFormIsValid || s.postFormIsFrozen}>Update</Button>
              </ModalFooter> 
            </Modal>
          </div>
        }
            
      </div>
    );
  }
}

export default PostItem;






/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */

/**
 * Utility components: Only local to this file (not exported)
 * -------------------------------------------------
 */
const MessageForm = (props) => {
  const { handleSubmit, handleChange, state } = props; 
  const stl = formStyle;
  const {postFormFields, postFormErrors, postFormIsFrozen} = state; 
  const fields = new Map(Object.entries(DBPost.formFields)); 
  let formFields = []; 

  fields.forEach((value, key)=>{ 
    let inputStyle = stl[key]?stl[key].input:stl.inputField,
        labelStyle = stl[key]?stl[key].label:stl.label, 
        formGroupStyle = stl[key]?stl[key].formGroup:stl.formGroup, 
        tmpVal = value.formField.placeholder;
    formFields.push(
      <FormGroup className={postFormErrors[key]?'is-invalid':''} key={key} style={formGroupStyle}>
        <Label className={stl[key]?stl[key].className:''} for={key} style={labelStyle}>
          <IconLabel value={value} /> {' '}
          <TexTLabelFileInput type={key} value={postFormFields.file} tmpText={value.label.text} />
          <TexTLabelOtherInput type={key} value={value.label.text} /> 
        </Label>

        <ImgUpload ype={key} />

        <SelectInput type={value.formField.type} ident={key} style={inputStyle} 
        placeholder={tmpVal} onChange={handleChange} value={postFormFields[key]} options={value.formField.options} 
        disabled={postFormIsFrozen} />

        <OtherInput type={value.formField.type} ident={key} style={inputStyle} 
        placeholder={tmpVal} onChange={handleChange} value={postFormFields[key]}
        error={postFormErrors} disabled={postFormIsFrozen}  /> 
      </FormGroup> 
    ); 
  });

  return(
    <div style={{position:'relative'}}>
      <Toast active={postFormIsFrozen}>Wait a moment...</Toast> 
      <Form onSubmit={handleSubmit}>
        { formFields.map((field)=> field) } 
        {/* <DisplayPostIMage src={state.user.imgUrl} alt={p.data.title} /> */}
      </Form>
    </div>
  );
}//[end] MessageForm


const ImgUpload = (props) => {
  if(props.type!=='file') return false;

  return(
    <div>
      <img className="img-fluid" />
    </div>
  );
};




const Overlay = (props) => {
  if(!props.active) return false;
  let style={
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    position: 'absolute',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  };
  return(
    <section style={style}>{props.children}</section>
  );
};



const FormFieldError = (props) => {
  const data = props.data;
  if(!data){ return false; }
  return(
    <div className="invalid-feedback" style={{display:'block', fontSize:'90%'}}>
      {data}
    </div>
  );
};



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
  let {type, value, ident, style, placeholder, onChange, options, disabled } = props; 
  if(type!=='select') return false;
  return(
    <Input type={type} name={ident} id={ident} style={style} onChange={onChange} value={value} disabled={disabled}>
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
  let {type, value, ident, style, placeholder, onChange, options, error, disabled } = props; 
  if(type==='select') return false;
  return(
    <div>
      <Input type={type} name={ident} id={ident} style={style} onChange={onChange} value={value} 
      placeholder={placeholder} disabled={disabled} />
      <FormFieldError data={error[ident]} />
    </div>
  );
}


const DisplayPostIMage = (props) => {
  if(!props.src) return false;
  return(
    <Figure img={props.src.url} alt={props.alt} /> 
  )
}; 

const DisplayUserMenu = (props) => {
  const { userID, data, isActive, handleToggle, handleEdit, openConfirm, style } = props;
  if(userID!==data.uid) return false;
  return(
    //Only post owner can modify it ... 
    <Dropdown direction="left" isOpen={isActive} toggle={handleToggle}>
      <DropdownToggle style={PostItemStyle.buttonEdit}> 
        <span className="sr-only">Edit your post</span>
        <FontAwesomeIcon icon={faEllipsisH} /> 
      </DropdownToggle>
      <DropdownMenu> 
        <DropdownItem style={style} onClick={()=>handleEdit(data.id)}>Edit</DropdownItem> 
        <DropdownItem style={style} onClick={()=>{ openConfirm(data.id) }}>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown> 
  );
}

const DisplayUserAvatar = (props) => {//data={s.user} style={PostItemStyle.avatar}
  const { data, style } = props;
  if(!data) return false;
  return(
    <Figure img={data.photoURL} alt={data.displayName} style={style} avatar circle size="small" />
  )
}; 

const DisplayFooter = (props) => {//data={s.user} style={PostItemStyle.avatar}
  const { data } = props;
  if(!data) return false;
  return(
    <CardFooter className="PostItem__footer">
      <div className="PostItem__footer-info"> 
        {
          data.location && <small className="PostItem__date">
                            <FontAwesomeIcon icon={faMapMarker} />{data.location}
                          </small>
        }  
        {
          data.places && <small className="PostItem__date">
                            <FontAwesomeIcon icon={faUsers} />{data.places}
                          </small>
        }  
      </div>
      <div className="PostItem__footer-action"> 
        <Button className="PostItem__btn-action" block>
          <span className="sr-only">Contact</span>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </div>
    </CardFooter>
  )
}; 
/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */