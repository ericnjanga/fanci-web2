/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Button, Card, CardText, CardBody, CardTitle, CardFooter } from 'reactstrap'; 
import DBUser from '../../utilities/DBUser.class.js';  
import DBUpload from './../../utilities/DBUpload.class.js';
import Figure from './../../components__reusable/Figure/Figure.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import faEllipsisH from '@fortawesome/fontawesome-free-solid/faEllipsisH';
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
    const { uid, file } = this.props.data;
    console.log('.....', this.props.data);
    DBUser.get(uid).then((user) => {
      this.setState({ user });
    });
    if(file) { 
      console.log('...file=', file)
      DBUpload.getFile(file).then((imgUrl) => {
        console.log('>>>>>imgUrl=', imgUrl);
        this.setState({ imgUrl });
      });
    }
  }

  render() {
    const { data } = this.props; 
    const { user, imgUrl } = this.state; 
    const style = {
      avatar: { 
        margin: 0,
        position: 'absolute', 
        top: '10px',
        left: '10px'
      },
      header: { 
        padding: '10px 10px 10px 55px',
        marginBottom: '1rem',
        lineHeight: '0.5rem'
      },
      header_title: { 
        marginBottom: '0.3rem' 
      },
      cardBody: {
        paddingTop: 0
      },
      buttonEdit: {
        position: 'absolute',
        width: '40px',
        right: '0', 
        background: 'transparent',
        color: '#6c757d',
        border: '0px solid',


      }
    };
    return( 
      <Card className="UserMessage"> 
 
        <Button style={style.buttonEdit}>
          <span className="sr-only">Edit your post</span>
          <FontAwesomeIcon icon={faEllipsisH} />
        </Button>



        { 
          user && <Figure img={user.photoURL} alt={user.displayName} style={style.avatar} avatar circle size="small" />
        }
        <div style={style.header}> 
          <CardTitle style={style.header_title}>{data.title}</CardTitle> 
          <small className="UserMessage__date">{moment(data.date).format('MMMM Do, YYYY')}</small>
        </div>
 
        {
          imgUrl && <Figure img={imgUrl.url} alt={data.title} /> 
        } 
        
                                  

        <CardBody style={style.cardBody}>   
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