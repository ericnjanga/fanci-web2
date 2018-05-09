/**
 * Component rendering a <form /> which will handle data submition from the "message board"
 */
import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DBPost from './../../utilities/DBPost.class.js'; 
import formStyle from './../../jsStyles/form.styles.js';
// import './MessageForm.css'; 






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

export default MessageForm;








/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */
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
