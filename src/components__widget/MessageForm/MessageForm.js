/**
 * Component rendering a <form /> which will handle data submition from the "message board"
 */
import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import './MessageForm.css'; 


const MessageForm = (props) => {
  const { handleSubmit, handleChange, ...formProps} = props; 
  return(
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Fanci Title:</Label>
        <Input type="text" name="title" id="title" placeholder="Enter a title" onChange={handleChange} value={formProps.title} />
      </FormGroup> 
      <FormGroup>
        <Label for="exampleFile">File</Label>
        <Input type="file" name="file" id="exampleFile" />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          It's a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="duration">Duration:</Label> 
        <Input type="select" name="duration" id="duration" onChange={handleChange} value={formProps.duration}>
          <option>How long this will be displayed?</option>
          <option>3 hr</option>
          <option>10 hr</option>
          <option>1 day</option>
          <option>1 week</option> 
        </Input>
      </FormGroup> 
      <FormGroup>
        <Label for="places">Places Available:</Label> 
        <Input type="select" name="places" id="places" onChange={handleChange} value={formProps.places}>
          <option>How many people can participate?</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option> 
          <option>5</option> 
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location:</Label>
        <Input type="text" name="location" id="location" placeholder="Where this will take place?" onChange={handleChange} value={formProps.location} />
      </FormGroup> 
      <FormGroup>
        <Label for="exampleText">Fanci Description</Label>
        <Input type="textarea" name="content" id="content" placeholder="Describe what your fanci is all about!" onChange={handleChange} value={formProps.content} />
      </FormGroup>   
    </Form>
  );
}

export default MessageForm;