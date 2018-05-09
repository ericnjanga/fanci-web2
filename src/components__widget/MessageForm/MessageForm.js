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
    formFields.push(
      <FormGroup key={key}>
        <Label className={s[key]?s[key].className:''} for={key} style={s.label}>
          {value.label.icon && value.label.icon} 
          {
            key==='file'?
            (props.file!==''?' '+props.file.replace('timeline/',''):' '+value.label.text)
            :
            value.label.text
          } 
        </Label>
        {
          value.formField.type!=='select' ?
          <Input style={s[key]?s[key].input:{}} type={value.formField.type} name={key} id={key} placeholder={value.formField.placeholder} onChange={handleChange} value={post[key]} />
          : 
          <Input style={s[key]?s[key].input:{}} type={value.formField.type} name={key} id={key} placeholder={value.formField.placeholder} onChange={handleChange} value={post[key]}>
            <option>{value.formField.placeholder}</option>
            {
              value.formField.options.map((option)=>{
                return <option key={option.val} value={option.val}>{option.label}</option>
              })
            }
          </Input>
        } 
      </FormGroup> 
    ); 
  });

  return(
    formFields .map((field)=> field)
  );
}

export default MessageForm;