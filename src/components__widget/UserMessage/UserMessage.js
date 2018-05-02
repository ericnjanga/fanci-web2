/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Button, Card, CardText, CardBody, CardTitle, CardFooter } from 'reactstrap'; 
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Alert } from 'reactstrap';
import DBUser from '../../utilities/DBUser.class.js';  
import DBUpload from './../../utilities/DBUpload.class.js';
import DBPost from './../../utilities/DBPost.class.js';
import Figure from './../../components__reusable/Figure/Figure.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome';  
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import faEllipsisH from '@fortawesome/fontawesome-free-solid/faEllipsisH';
import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import moment from 'moment';
import './UserMessage.css';


class UserMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user          : null,
      dropdownOpen  : false,
      removeAsked  : false,
      canBeEdited   : false
    }
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleEdit(postID) {

  }


  handleDelete(postID) { 
    //Once the post is deleted, hide confirm dialog and cancel user pick
    DBPost.remove(postID).then(()=>{ 
      let meta = {
        active: false,
        confirmed:false
      };
      this.props.handleConfirmModal(null, meta);
    }); 
  }
  //Open confirmation modal to see if this post can be deleted
  oPenConfirmRemoveModal(postID) {
    let meta = {
      active: true,
      title: 'Fanci Delete', 
      content : ()=> {
        return(
          <Alert color="danger" style={{marginBottom:0}}>
            <FontAwesomeIcon icon={faExclamationTriangle} /> {' '}
            Are you sure you want to delete this fanci?
          </Alert>
        )
      }
    };
    this.props.handleConfirmModal(null, meta);
    this.setState({ removeAsked:true }); 
  }

  componentDidMount() {
    const { uid, file } = this.props.data; 
    DBUser.get(uid).then((user) => {
      this.setState({ user });
    });
    if(file) {  
      DBUpload.getFile(file).then((imgUrl) => { 
        this.setState({ imgUrl });
      });
    }
  } 

  //Figure Out what to do when component updates
  //Edit? Delete?
  componentDidUpdate(){
    const s = this.state;
    const p = this.props;
    if(s.removeAsked && p.confirmModal.confirmed){
      this.handleDelete(p.data.id); 
    } 
  } 

  render() {
    const s = {...this.state}; 
    const p = {...this.props}; 
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
        border: '0px solid'
      }
    };
 
    
    return( 
      <Card className="UserMessage">

      { //Only post owner can modify it ...
        p.loggedUserID===p.data.uid && 
        <Dropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
          <DropdownToggle style={style.buttonEdit}> 
            <span className="sr-only">Edit your post</span>
            <FontAwesomeIcon icon={faEllipsisH} /> 
          </DropdownToggle>
          <DropdownMenu> 
            <DropdownItem onClick={()=>this.handleEdit(p.data.id)}>Edit</DropdownItem> 
            <DropdownItem onClick={()=>{ this.oPenConfirmRemoveModal(p.data.id) }}>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown> 
      } 



        { 
          s.user && <Figure img={s.user.photoURL} alt={s.user.displayName} style={style.avatar} avatar circle size="small" />
        }
        <div style={style.header}> 
          <CardTitle style={style.header_title}>{p.data.title}</CardTitle> 
          <small className="UserMessage__date">{moment(p.data.date).format('MMMM Do, YYYY')}</small>
        </div>
 
        {
          s.imgUrl && <Figure img={s.imgUrl.url} alt={p.data.title} /> 
        } 
        
                                  

        <CardBody style={style.cardBody}>   
          <CardText>{p.data.content}</CardText> 
        </CardBody> 

        <CardFooter className="UserMessage__footer">
          <div className="UserMessage__footer-info"> 
            {
              p.data.location && <small className="UserMessage__date">
                                <FontAwesomeIcon icon={faMapMarker} />{p.data.location}
                              </small>
            }  
            {
              p.data.places && <small className="UserMessage__date">
                                <FontAwesomeIcon icon={faUsers} />{p.data.places}
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