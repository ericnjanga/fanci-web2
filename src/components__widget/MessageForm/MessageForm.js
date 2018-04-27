/**
 * Component rendering a <form /> which will handle data submition from the "message board"
 */
import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
// import './MessageForm.css'; 


const MessageForm = (props) => {
  const { handleSubmit, handleChange, title, content } = props; 
  return(
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Title</Label>
        <Input type="text" name="title" id="title" placeholder="Enter a title" onChange={handleChange} value={title} />
      </FormGroup> 
      <FormGroup>
        <Label for="exampleText">Text Area</Label>
        <Input type="textarea" name="content" id="content" placeholder="Enter your message" onChange={handleChange} value={content} />
      </FormGroup>   
    </Form>
  );
}

export default MessageForm;