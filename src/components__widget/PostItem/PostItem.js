/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Button, Card, CardText, CardBody, CardTitle, CardFooter } from 'reactstrap'; 
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Alert } from 'reactstrap';
import { dropdownSyles } from './../../jsStyles/menu.styles.js';
import PostItemStyle from './../../jsStyles/PostItem.styles.js';
import DBUser from '../../utilities/DBUser.class.js';  
import DBUpload from './../../utilities/DBUpload.class.js';
import DBPost from './../../utilities/DBPost.class.js';
import Figure from './../../components__reusable/Figure/Figure.js'; 
import DateFormat from './../../components__reusable/DateFormat.js'; 
import FontAwesomeIcon from '@fortawesome/react-fontawesome';  
import faMapMarker from '@fortawesome/fontawesome-free-solid/faMapMarker';
import faEllipsisH from '@fortawesome/fontawesome-free-solid/faEllipsisH';
import faExclamationTriangle from '@fortawesome/fontawesome-free-solid/faExclamationTriangle';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faUsers from '@fortawesome/fontawesome-free-solid/faUsers';
import './PostItem.css';


class PostItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user          : null,
      dropdownOpen  : false,
      removeAsked  : false,
      canBeEdited   : false
    }
    this.handleEdit = this.handleEdit.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.oPenConfirmRemoveModal = this.oPenConfirmRemoveModal.bind(this);
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleEdit(postID) {
    const p = {...this.props};
    const params = {
      mode: 'edit',
      title: 'Edit Your Fanci!',
      btnYes: 'Update'
    };
    p.toggleTimelineModal({ data:p.data, params });
  }


  handleDelete(postID) { 
    //Once the post is deleted, hide confirm dialog and cancel user pick
    DBPost.remove(postID).then(()=>{ 
      let meta = {
        active: false,
        user_pick:false
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

  /**
   * 1) Fetch user data
   * 2) Fetch post image information
   */
  componentDidMount() {
    const { uid, file } = this.props.data; 
    DBUser.get(uid).then((user) => {
      this.setState({ user });
    });
    console.log('.....', this.props.data)
    if(file) {  
      DBUpload.getFile(file).then((imgUrl) => { 
        console.log('*********imgUrl=', imgUrl);
        this.setState({ imgUrl:imgUrl });
      });
    }
  } 

  //Figure Out what to do when component updates
  //Edit? Delete?
  componentDidUpdate(){
    const s = this.state;
    const p = this.props;
    if(s.removeAsked && p.confirmationModal.user_pick){
      this.handleDelete(p.data.id); 
    } 
  } 

  render() {
    const s = {...this.state}; 
    const p = {...this.props};  
    return( 
      <Card className="PostItem" style={p.style}>
        <DisplayUserMenu userID={p.loggedUserID} data={p.data} isActive={this.state.dropdownOpen} style={dropdownSyles}
        handleToggle={this.toggleDropdown} handleEdit={this.handleEdit} openConfirm={this.oPenConfirmRemoveModal} />

        <DisplayUserAvatar data={s.user} style={PostItemStyle.avatar} />

        <header style={PostItemStyle.header}> 
          <CardTitle style={PostItemStyle.header_title}>{p.data.title}</CardTitle> 
          <small className="PostItem__date">
            <DateFormat millisec={p.data.date} />
          </small>
        </header>
 
        <DisplayPostIMage src={s.imgUrl} alt={p.data.title} />
        
        <CardBody style={PostItemStyle.cardBody}>   
          <CardText>{p.data.content}</CardText> 
        </CardBody> 

        <DisplayFooter data={p.data} />
      </Card> 
    );
  }
}

export default PostItem;






/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */
const DisplayPostIMage = (props) => {
  if(!props.src) return false;
  return(
    <Figure img={props.src.url} alt={props.alt} /> 
  )
}; 

const DisplayUserMenu = (props) => {
  const { userID, data, isActive, handleToggle, handleEdit, openConfirm, style } = props;
  if(userID!==data.uid) return false;
  return(
    //Only post owner can modify it ... 
    <Dropdown direction="left" isOpen={isActive} toggle={handleToggle}>
      <DropdownToggle style={PostItemStyle.buttonEdit}> 
        <span className="sr-only">Edit your post</span>
        <FontAwesomeIcon icon={faEllipsisH} /> 
      </DropdownToggle>
      <DropdownMenu> 
        <DropdownItem style={style} onClick={()=>handleEdit(data.id)}>Edit</DropdownItem> 
        <DropdownItem style={style} onClick={()=>{ openConfirm(data.id) }}>Delete</DropdownItem>
      </DropdownMenu>
    </Dropdown> 
  );
}

const DisplayUserAvatar = (props) => {//data={s.user} style={PostItemStyle.avatar}
  const { data, style } = props;
  if(!data) return false;
  return(
    <Figure img={data.photoURL} alt={data.displayName} style={style} avatar circle size="small" />
  )
}; 

const DisplayFooter = (props) => {//data={s.user} style={PostItemStyle.avatar}
  const { data } = props;
  if(!data) return false;
  return(
    <CardFooter className="PostItem__footer">
      <div className="PostItem__footer-info"> 
        {
          data.location && <small className="PostItem__date">
                            <FontAwesomeIcon icon={faMapMarker} />{data.location}
                          </small>
        }  
        {
          data.places && <small className="PostItem__date">
                            <FontAwesomeIcon icon={faUsers} />{data.places}
                          </small>
        }  
      </div>
      <div className="PostItem__footer-action"> 
        <Button className="PostItem__btn-action" block>
          <span className="sr-only">Contact</span>
          <FontAwesomeIcon icon={faCheck} />
        </Button>
      </div>
    </CardFooter>
  )
}; 
/**
 * Component only local to this file (not exported)
 * -------------------------------------------------
 */