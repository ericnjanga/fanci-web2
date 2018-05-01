/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Button, Card, CardText, CardBody, CardTitle, CardFooter } from 'reactstrap'; 
import DBUser from '../../utilities/DBUser.class.js';  
import Figure from './../../components__reusable/Figure/Figure.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import moment from 'moment';
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
    const style = {
      avatar: { 
        margin: 0,
        position: 'absolute', 
        top: '10px',
        left: '10px'
      }
    };
    return( 
      <Card className="UserMessage"> 
        { 
          user && <Figure img={user.photoURL} alt={user.displayName} style={style.avatar} avatar circle size="small" />
        }
        <div className="UserMessage__head"> 
          <CardTitle>{data.title}</CardTitle> 
          <small className="UserMessage__date">{moment(data.date).format('MMMM Do, YYYY')}</small>
        </div>
        
        <CardBody>   
          <CardText>{data.content}</CardText> 
        </CardBody> 

        <CardFooter className="UserMessage__footer">
          <div className="UserMessage__footer-info"> 
            {
              data.location && <small className="UserMessage__date">
                                <FontAwesomeIcon icon={faMapMarker} />{data.location}
                              </small>
            }  
            {
              data.places && <small className="UserMessage__date">
                                <FontAwesomeIcon icon={faUsers} />{data.places}
                              </small>
            }  
          </div>
          <div className="UserMessage__footer-action"> 
            <Button className="UserMessage__btn-action" block>
              <span className="sr-only">Contact</span>
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </div>
        </CardFooter>
      </Card> 
    );
  }
}

export default UserMessage;