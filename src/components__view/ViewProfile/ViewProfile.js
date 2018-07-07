import React from 'react';
import {Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Figure from './../../components__reusable/Figure/Figure.js';
import Toast from './../../components__reusable/Toast/Toast.js'; 
import DBUser from '../../services/utilities/DBUser.class.js';
import DateFormat from './../../components__reusable/DateFormat.js';
import ViewApp from './../ViewApp.js';
import {formStyleDarkTheme } from './../../jsStyles/form.styles.js';
import './ViewProfile.css';


class ViewProfile extends ViewApp {
  constructor(props) {
    super(props);
    this.state = {
      userProfile   : this.props.userProfile,  
      overlayActive : false
    }
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  } 

  //Save input value in the state object (@userProfile)
  handleInputChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let userProfile = { ...this.state.userProfile};
    userProfile[name] = value;
    this.setState({userProfile }); 
  } 

  //When form is submitted:
  //-> Mask layout with overlay while data is processed
  //-> When data is successfully submitted, remove overlay
  //-> Update @userProfile object at the application level (@onProfileChange)
  handleSubmit(e) {
    e.preventDefault();
    this.setState({overlayActive : true });

    DBUser.updateProfile(this.state.userProfile).then((success) => {
      this.setState({
        overlayActive : false
      });
      this.props.onProfileChange(this.state.userProfile);
    });
  }// [end] handleSubmit

  render() {
    const {userProfile, overlayActive } = this.state;
    const theme = formStyleDarkTheme;
    const checkboxFormGroup = { ...theme.formGroup, ...theme.checkBox.formGroup}; 

    return (
      <div className="view__content ViewProfile">  
        {/* Display a toast if the list of items is not yet ready */ }
        <Toast active={overlayActive}>Saving data</Toast>
         
        <div className="ViewProfile__maincol">
          <div>
            <Figure 
              img={userProfile.photoURL} 
              alt={userProfile.displayName} 
              className="user-avatar" 
              avatar 
              circle 
              size="xxl" 
            /> 
            {
              userProfile.lastSignin && 
              <p style={{display:'flex', marginTop:'5px', flexDirection:'column', textAlign:'center' }}>
                <small style={{color:'rgba(0,0,0,0.5)' }}>Last Signin</small> 
                <DateFormat millisec={userProfile.lastSignin} />
              </p> 
            }
          </div>
    
          <Form onSubmit={this.handleSubmit}> 
            <FormGroup style={theme.formGroup}>
              <Label 
                for="name" 
                style={theme.label}>
                  User Name
                </Label>
              {
                !userProfile ? (
                  <Input 
                    style={theme.inputField} 
                    type="text" 
                    name="displayName" 
                    id="displayName" 
                    placeholder="Enter your username" 
                  />
                ) : (
                  <Input 
                    style={theme.inputField} 
                    type="text" 
                    name="displayName" 
                    id="displayName" 
                    value={userProfile.displayName} 
                    onChange={this.handleInputChange} 
                    placeholder="Enter your username"
                  />
                )
              }  
            </FormGroup>

            <FormGroup style={theme.formGroup}>
              <Label 
                for="biography" 
                style={theme.label}>
                Biography
              </Label>
              {
                !userProfile ? ( 
                  <Input 
                    style={theme.inputField} 
                    type="textarea" 
                    name="biography" 
                    id="biography" 
                    placeholder="Enter a short biographie" 
                  /> 
                ) : (
                  <Input 
                    style={theme.inputField} 
                    type="textarea" 
                    name="biography" 
                    id="biography" 
                    value={userProfile.biography} 
                    onChange={this.handleInputChange} 
                    placeholder="Enter a short biographie" 
                  /> 
                )
              }  
            </FormGroup>

            <FormGroup style={theme.formGroup}>
              <Label 
                for="email" 
                style={theme.label}>
                Email
              </Label> 
              {
                !userProfile ? (
                  <Input 
                    style={theme.inputField} 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Enter your email" 
                  />
                ) : (
                  <Input 
                    style={theme.inputField} 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder={userProfile.email} 
                    readOnly
                  />
                )
              }  
            </FormGroup>   

            <FormGroup style={theme.formGroup}>
              <Label 
                for="phoneNumber" 
                style={theme.label}>
                Phone Number
              </Label> 
              {
                !userProfile ? (
                  <Input 
                    style={theme.inputField} 
                    type="text" 
                    name="phoneNumber" 
                    id="phoneNumber" 
                    placeholder="Enter your phone number" 
                  /> 
                ) : (
                  <Input 
                    style={theme.inputField} 
                    type="text" 
                    name="phoneNumber" 
                    id="phoneNumber" 
                    value={userProfile.phoneNumber} 
                    onChange={this.handleInputChange} 
                    placeholder="Enter your phone number" 
                  /> 
                )
              }  
            </FormGroup>
  
            <FormGroup 
              className="form-group" 
              check style={checkboxFormGroup}> 
              <Label 
                for="visible" 
                style={theme.label}>
                {
                  !userProfile ? (
                    <Input 
                      style={theme.checkBox.input} 
                      type="checkbox" 
                      name="visible" 
                      id="visible" 
                    />
                  ) : (
                    <Input 
                      style={theme.checkBox.input} 
                      type="checkbox" 
                      name="visible" 
                      id="visible" 
                      checked={userProfile.visible} 
                      onChange={this.handleInputChange} 
                    />
                  )
                }  
                {' '}Visible to everyone
              </Label>
            </FormGroup>
        
            <Button color="primary" block>Submit</Button> 
          </Form> 
        </div> 
      </div>
    );
  }// [end] render
}// [end] Profile

export default ViewProfile;