/**
 * Renders a modal which allows user to "create" a post 
 */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Figure from './../../components__reusable/Figure/Figure.js';
import Toast from './../../components__reusable/Toast/Toast.js';
import DBPost from '../../utilities/DBPost.class.js';
import DBUpload from './../../utilities/DBUpload.class.js';
import modalStyle from './../../jsStyles/modal.styles.js';
import { formStyleLightTheme } from './../../jsStyles/form.styles.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimesCircle from '@fortawesome/fontawesome-free-solid/faTimesCircle';
import './ModalPost.css';


/**
 * TODO:
 * 1) SET EMPTY PROPERTY TO NULL: obj.ppt = null (except file, will through an error if value is null. place empty string instead)
 * 2) ADD UNIQUE PREFIX FOR EACH NEWLY POSTED IMAGE (timeline/datetime-imagename)
 * ---- think inheritance ----
 * 3) MERGE "PostItem" AND "ModalPostCreate" methods into one (start from the small methods)
 * 4) Let DBPost handle 'timeline/' prefix
 */


class ModalPostCreate extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      postFormFields: {
        ...DBPost.getPostObject(),
      },
      postFileUpload: {
        downloadURLs: null,
      },
      postFormValidity: {
        title: false,
        location: false,
        content: false,
      },
      postFormErrors: {
        title: null,
        location: null,
        content: null,
        expiry: null,
        places: null,
      },
      postFormMinCars: {
        title: 10,
        location: 4,
        content: 30,
      },
      postFormIsValid: false,
      postFormIsFrozen: false,
    };//state

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
  }// [end] constructor

  handleRemoveImage(event, callback) {

    if (event) {

      event.preventDefault();

    }

    this.setState({ postFormIsFrozen: !this.state.postFormIsFrozen });
    let postFormFields = { ...this.state.postFormFields },
      postFileUpload = { ...this.state.postFileUpload },
      filePath = this.state.postFormFields.file;

    // Only remove the image if there is a value
    if (filePath) {

      filePath = filePath ? filePath : postFileUpload.file;
      filePath = filePath.replace('timeline/', '');
      // Delete image in storage
      // then clear related fields
      DBUpload.remove(filePath, true).then((result) => {
        // file field cannot have 'null' for value
        postFileUpload.file = '';
        postFormFields.file = '';
        // No image will be displayed
        postFileUpload.downloadURLs = null;
        this.setState({ postFormIsFrozen: false, postFileUpload, postFormFields });
      });
    }

    if (typeof callback === 'function') {
      callback();
    }
  }// [end] handleRemoveImage

  clearModal() {
    //Cleanup form when post is successful ...
    let postFormFields = { ...DBPost.getPostObject() },
      postFileUpload = { downloadURLs: null, file: '' },
      postFormIsFrozen = false;
    this.setState((prevState, props) => {
      return { postFormFields, postFileUpload, postFormIsFrozen }
    });
  }// [end] clearModal 


  /**
   * - Unfreeze all fields
   * - Display overlay (z-index higher than everything inside modal except 'cancel' button)
   */
  freezeForm(bool) {
    this.setState({ postFormIsFrozen: bool });
  }


  /**
   * 
   * @param {*} postFormFields 
   */
  getReadyPostObject(postFormFields) {
    // transfert post data to temporary object and cleanup file path
    let finalPost = { ...postFormFields };
    // Make sure file is saved in "timeline" folder ...
    // (only if "file" has been provided)
    if (finalPost.file) {
      finalPost.file = finalPost.file.replace(/C:\\fakepath\\/, '');
      finalPost.file = 'timeline/' + finalPost.file;
    }
    return finalPost;
  }


  /**
   * If user object is provided:
   * - Save form data in the database
   * - Cleanup form and modal
   * - Dismiss modal
   * @param {*} event 
   * @param {*} user 
   */
  handleSubmit(event, user) {

    event.preventDefault();
    if (user) {

      this.freezeForm(true);
      const finalPost = this.getReadyPostObject(this.state.postFormFields);
      // Save post
      DBPost.save(finalPost, user.uid)
        // Reset "postFormFields" state object once its done
        .then(() => {

          this.clearModal();
          this.freezeForm(false);
          this.props.toggle();

        });

    }// user

  }

  /**
   * Use event.target to update the form property name and value.
   * If target is a 'file' input, save value in "Firebase Storage"
   * @param {*} event 
   */
  handleChange(event) {

    const postFormFields = this.state.postFormFields;
    const name = event.target.name;
    // Will be input value or new File object  
    let value = event.target.value;

    // For 'file' upload it right away on "Firebase Storage"
    // and save the name in the state for later use when post
    // will be created
    if (name === 'file') {

      let newFile = event.target.files[0],
        env = this,
        postFileUpload = {};

      this.setState({ postFormIsFrozen: true });

      DBUpload.save(newFile).then(function (snapshot) {
        postFileUpload.downloadURLs = snapshot.metadata.downloadURLs[0];
        env.setState({ postFileUpload, postFormIsFrozen: false });
      });
    }// [end] file
    //....
    postFormFields[name] = value;
    this.setState({ postFormFields }, () => {
      this.validateField(name, value);
    });

  }// [end] handleChange

  /**
   * Validate any form field (only title, location and content for now).
   * Update state on field 'error status' and 'validity'
   * @param {*} name 
   * @param {*} value 
   */
  validateField(name, value) {
    if (name === 'title' || name === 'location' || name === 'content') {
      let postFormErrors = { ...this.state.postFormErrors },
        postFormValidity = { ...this.state.postFormValidity },
        postFormMinCars = { ...this.state.postFormMinCars };

      let minCars = postFormMinCars[name],
        fieldValue = value.trim();
      postFormValidity[name] = fieldValue.length >= minCars;
      postFormErrors[name] = postFormValidity[name] ? null : `${name} is too short, ${(minCars - fieldValue.length)} chars left`;

      this.setState({ postFormErrors, postFormValidity }, () => {
        this.validateForm(postFormValidity);
      });
    }// [end]...
  }

  /**
   * Find-out if all fields are valid and update the state property on form validity status
   * @param {*} postFormValidity 
   */
  validateForm(postFormValidity) {
    const validObj = new Map(Object.entries(postFormValidity));
    const validValues = Array.from(validObj.values());
    let postFormIsValid = validValues.find((item) => { return item === false });
    postFormIsValid = (postFormIsValid === undefined) ? true : false;
    this.setState({ postFormIsValid });
  }

  /**
   * Delete any previously saved image (because the post creation is being cancelled)
   * Trigger form fields cleaning method
   * Unfreeze modal
   * Toggle modal visibility
   */
  handleCancel() {

    this.handleRemoveImage(null, () => {

      this.clearModal();
      this.freezeForm(false);
      this.props.toggle();

    });

  }


  render() {

    const p = { ...this.props };
    const s = { ...this.state };
    const style = {
      avatar: {
        margin: 0,
        position: 'absolute',
        top: '10px',
        left: '15px',
      },
      btnCancel: {
        ...modalStyle.ctaBtn,
        ...modalStyle.btnNo,
        // Make sure cancel button is always supperior than inner <Toast />
        position: 'relative',
        zIndex: '1100',
      },
      btnSubmit: {
        ...modalStyle.ctaBtn,
        ...modalStyle.btnYes,
      },
    };


    return (
      <Modal
        isOpen={p.data.active}
        toggle={p.toggle}
        className={'ModalPost'}
        backdrop={'static'}>
        <Figure
          img={p.user.photoURL}
          alt={p.user.displayName}
          style={style.avatar}
          avatar
          circle
          size="med"
        />
        {
          p.data.params && <div>
            <ModalHeader
              toggle={p.toggle}
              style={modalStyle.header}>
              {p.data.params.title}
            </ModalHeader>
            <ModalBody style={modalStyle.body}>
              <MessageForm
                handleChange={this.handleChange}
                removeImage={this.handleRemoveImage}
                state={s}
              />
            </ModalBody>
            <ModalFooter style={modalStyle.footer}>
              <Button
                style={style.btnCancel}
                color="secondary"
                onClick={() => this.handleCancel()}>Cancel</Button>{' '}
              <Button
                style={style.btnSubmit}
                color="primary"
                onClick={(event) => this.handleSubmit(event, p.user)}
                disabled={!s.postFormIsValid || s.postFormIsFrozen}
              >
                {p.data.params.btnYes}
              </Button>
            </ModalFooter>
          </div>
        }
      </Modal>
    );
  }
}// [end] ModalPostCreate

export default ModalPostCreate;

/**
 * Utility components: Only local to this file (not exported)
 * -------------------------------------------------
 */
const DisplayLabel = (props) => {

  if (props.type === 'file') return false;
  const { type, formStyle, value } = props;
  const stl = formStyle;

  return (
    <Label
      className={stl[type] ? stl[type].className : ''}
      for={type}
      style={props.style}>
      <IconLabel value={value} /> {' '}
      <TexTLabelOtherInput
        type={type}
        value={value.label.text}
      />
    </Label>
  );

};


const DisplayFileUpload = (props) => {
  if (props.type !== 'file') return false;
  const { type, formStyle, value, control, imgUrl, removeImage } = props;
  const stl = formStyle;
  const btnDelStyle = { position: 'absolute', top: '0px', right: '0px', fontSize: '1.7rem', background: 'transparent', border: '0px', color: '#000' };

  return (
    <div style={{ border: '0px solid red' }}>
      <Label
        className={stl[type] ? stl[type].className : ''}
        for={type}
        style={props.style}>
        <IconLabel value={value} /> {' '}
        <TexTLabelFileInput
          type={type}
          value={control.file}
          tmpText={value.label.text}
        />
        <TexTLabelOtherInput
          type={type}
          value={value.label.text}
        />
      </Label>

      {
        imgUrl && <div style={{ position: 'relative' }}>
          <Button
            style={btnDelStyle}
            onClick={removeImage}>
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{ background: '#fff', borderRadius: '30px' }}
            />
          </Button>
          <img
            className="img-fluid"
            src={imgUrl}
            alt={imgUrl}
          />
        </div>
      }
    </div>
  );
};


const MessageForm = (props) => {
  const { handleChange, removeImage, state } = props;
  const stl = formStyleLightTheme;
  const { postFormFields, postFormErrors, postFormIsFrozen, postFileUpload } = state;


  const fields = new Map(Object.entries(DBPost.formFields));
  let formFields = [];

  fields.forEach((value, key) => {
    let inputStyle = stl[key] ? stl[key].input : stl.inputField,
      labelStyle = stl[key] ? stl[key].label : stl.label,
      formGroupStyle = stl[key] ? stl[key].formGroup : stl.formGroup,
      tmpVal = value.formField.placeholder;
    formFields.push(
      <FormGroup
        className={postFormErrors[key] ? 'is-invalid' : ''}
        key={key}
        style={formGroupStyle}>
        <DisplayLabel
          type={key}
          formStyle={stl}
          style={labelStyle}
          value={value}
        />

        <DisplayFileUpload
          type={key}
          formStyle={stl}
          style={labelStyle}
          value={value}
          control={postFormFields}
          imgUrl={postFileUpload.downloadURLs}
          removeImage={removeImage}
        />

        <SelectInput
          type={value.formField.type}
          ident={key}
          style={inputStyle}
          placeholder={tmpVal}
          onChange={handleChange}
          value={postFormFields[key]}
          options={value.formField.options}
          disabled={postFormIsFrozen}
        />

        <OtherInput
          type={value.formField.type}
          ident={key}
          style={inputStyle}
          placeholder={tmpVal}
          onChange={handleChange}
          value={postFormFields[key]}
          error={postFormErrors}
          disabled={postFormIsFrozen}
        />
      </FormGroup>
    );
  });

  return (
    <div style={{ position: 'relative' }}>
      <Toast active={postFormIsFrozen}>Wait a moment...</Toast>
      <Form>
        {formFields.map((field) => field)}
      </Form>
    </div>
  );
}// [end] MessageForm


const FormFieldError = (props) => {
  const data = props.data;
  if (!data) { return false; }
  return (
    <div
      className="invalid-feedback"
      style={{ display: 'block', fontSize: '90%' }}>
      {data}
    </div>
  );
};


const IconLabel = (props) => {
  let icon = props.value.label.icon;
  if (!icon) return false;
  return icon;
}


const TexTLabelFileInput = (props) => {
  let type = props.type,
    value = props.value,
    placeholder = props.tmpText;
  if (type !== 'file') return false;
  //Display only filename or placeholder   
  return (!value) ? placeholder : value.replace(/C:\\fakepath\\/, '');
}


const TexTLabelOtherInput = (props) => {
  let type = props.type, value = props.value;
  if (type === 'file') return false;
  return value;
}


const SelectInput = (props) => {
  let { type, value, ident, style, placeholder, onChange, options, disabled } = props;
  if (type !== 'select') return false;
  return (
    <Input
      type={type}
      name={ident}
      id={ident}
      style={style}
      onChange={onChange}
      value={value}
      disabled={disabled}>
      <option>{placeholder}</option>
      {
        options.map((option) => {
          return <option key={option.val} value={option.val}>{option.label}</option>
        })
      }
    </Input>
  );
}


const OtherInput = (props) => {
  let { type, value, ident, style, placeholder, onChange, error, disabled } = props;
  if (type === 'select') return false;
  return (
    <div>
      <Input
        type={type}
        name={ident}
        id={ident}
        style={style}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
      <FormFieldError data={error[ident]} />
    </div>
  );
}
/**
 * Utility components: Only local to this file (not exported)
 * -------------------------------------------------
 */