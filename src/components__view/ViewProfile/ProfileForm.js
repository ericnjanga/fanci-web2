import React from 'react';
import Toast from './../../components__reusable/Toast/Toast.js';
import DBUser from '../../services/utilities/DBUser.class.js';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { formStyleDarkTheme } from './../../jsStyles/form.styles.js';


class ProfileForm extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      user: '',
      overlayActive: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {

    this.onMount();

  }// [end] componentDidMount


  // State update on DidMount should only be done here
  onMount() {

    this.setState({ user: this.props.user });

  }

  // Save input value in the state object (@user)
  handleInputChange(e) {

    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const user = { ...this.state.user };
    user[name] = value;
    this.setState({ user });

  }

  // When form is submitted:
  // -> Mask layout with overlay while data is processed
  // -> When data is successfully submitted, remove overlay
  // -> Update @user object at the application level (@onProfileChange)
  handleSubmit(e) {

    e.preventDefault();
    this.setState({ overlayActive: true });

    DBUser.updateProfile(this.state.user).then(() => {

      this.setState({
        overlayActive: false,
      });
      this.props.onProfileChange(this.state.user);
    });
  }// [end] handleSubmit

  render() {

    const { overlayActive, user } = this.state;
    const theme = formStyleDarkTheme;
    const checkboxFormGroup = {
      ...theme.formGroup,
      ...theme.checkBox.formGroup,
    };

    if (!user) {

      return false;

    }

    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <Toast active={overlayActive}>Saving data</Toast>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup style={theme.formGroup}>
            <Label
              htmlFor="name"
              style={theme.label}
            >
              User Name
            </Label>

            <Input
              style={theme.inputField}
              type="text"
              name="displayName"
              id="displayName"
              value={user.displayName}
              onChange={this.handleInputChange}
              placeholder="Enter your username"
            />
          </FormGroup>


          <FormGroup style={theme.formGroup}>
            <Label
              htmlFor="biography"
              style={theme.label}
            >
              Biography
            </Label>

            <Input
              style={theme.inputField}
              type="textarea"
              name="biography"
              id="biography"
              value={user.biography}
              onChange={this.handleInputChange}
              placeholder="Enter a short biographie"
            />
          </FormGroup>


          <FormGroup style={theme.formGroup}>
            <Label
              htmlFor="email"
              style={theme.label}
            >
              Email
            </Label>

            <Input
              style={theme.inputField}
              type="email"
              name="email"
              id="email"
              placeholder={user.email}
              readOnly
            />
          </FormGroup>


          <FormGroup style={theme.formGroup}>
            <Label
              htmlFor="phoneNumber"
              style={theme.label}
            >
              Phone Number
            </Label>

            <Input
              style={theme.inputField}
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              value={user.phoneNumber}
              onChange={this.handleInputChange}
              placeholder="Enter your phone number"
            />
          </FormGroup>


          <FormGroup className="form-group" check style={checkboxFormGroup}>
            <Label
              htmlFor="visible"
              style={theme.label}
            >
              <Input 
                style={theme.checkBox.input}
                type="checkbox"
                name="visible"
                id="visible"
                checked={user.visible}
                onChange={this.handleInputChange}
              />
              {' '}Visible to everyone
            </Label>
          </FormGroup>

          <Button color="primary" block>Submit</Button>
        </Form>
      </div>
    );
  }// [end] render
}// [end] Profile

export default ProfileForm;
