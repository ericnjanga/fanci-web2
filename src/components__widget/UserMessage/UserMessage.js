/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'; 
import DBUser from '../../utilities/DBUser.class.js';  
import UserAvatar from './../../components__widget/UserAvatar/UserAvatar.js';
import './UserMessage.css';


class UserMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user : null
    }
  }

  componentDidMount() {
    DBUser.get(this.props.data.uid).then((user) => {
      this.setState({ user });
    });
  }

  render() {
    const { data } = this.props; 
    const { user } = this.state; 
    return( 
      <Card className="UserMessage"> 
        <CardBody>
          { user && <UserAvatar item={user} /> }
          <CardTitle>{data.title}</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>{data.content}</CardText> 
        </CardBody>
      </Card> 
    );
  }
}

export default UserMessage;