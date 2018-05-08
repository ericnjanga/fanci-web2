/**
 * Component rendering a <form /> which will handle data submition from the "message board"
 */
import React from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import './MessageForm.css'; 


const MessageForm = (props) => {
  const { handleSubmit, handleChange, data} = props; 
  return(
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Fanci Title:</Label>
        <Input type="text" name="title" id="title" placeholder="Enter a title" onChange={handleChange} value={data.title} />
      </FormGroup> 
      <FormGroup>  
        <Label for="file">Fanci Image</Label>
        <Input type="file" name="file" id="file" onChange={handleChange} />
        <FormText color="muted">
          Max size: ...x...
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="duration">Duration:</Label> 
        <Input type="select" name="duration" id="duration" onChange={handleChange} value={data.duration}>
          <option>How long this will be displayed?</option>
          <option value="1">3 hr</option>
          <option value="2">10 hr</option>
          <option value="3">1 day</option>
          <option value="4">1 week</option> 
        </Input>
      </FormGroup> 
      <FormGroup>
        <Label for="places">Places Available:</Label> 
        <Input type="select" name="places" id="places" onChange={handleChange} value={data.places}>
          <option>How many people can participate?</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option> 
          <option value="5">5</option> 
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="location">Location:</Label>
        <Input type="text" name="location" id="location" placeholder="Where this will take place?" onChange={handleChange} value={data.location} />
      </FormGroup> 
      <FormGroup>
        <Label for="exampleText">Fanci Description</Label>
        <Input type="textarea" name="content" id="content" placeholder="Describe what your fanci is all about!" onChange={handleChange} value={data.content} />
      </FormGroup>   
    </Form>
  );
}

export default MessageForm;