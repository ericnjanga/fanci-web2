import React from 'react';
import withUser from './../../Hoc/withUser.js';
import ProfileHero from './ProfileHero.js';
import ProfileForm from './ProfileForm.js';
import ViewApp from './../ViewApp.js';
import './ViewProfile.css';


class ViewProfile extends ViewApp {
  constructor(props) {

    super(props);
    this.state = {};

  }


  onMount() {

    this.setState({
      DisplayProfileHero: withUser(ProfileHero),
      DisplayProfileForm: withUser(ProfileForm, this.props.onProfileChange),
    });

  }


  componentDidMount() {

    this.onMount();

  }


  render() {

    const { DisplayProfileHero, DisplayProfileForm } = this.state;

    return (
      <div className="view__content ViewProfile">
        {
          DisplayProfileHero && <DisplayProfileHero />
        }

        <div className="ViewProfile__maincol">
          {
            DisplayProfileForm && <DisplayProfileForm onProfileChange={this.props.onProfileChange} />
          }
        </div>
      </div>
    );

  }// [end] render
}// [end] Profile

export default ViewProfile;
