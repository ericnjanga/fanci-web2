/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react'; 
import { Card, CardTitle } from 'reactstrap'; 
import PostItemStyle from './../../jsStyles/PostItem.styles.js';
import Figure from './../../components__reusable/Figure/Figure.js'; 
// import PostItemPlaceholderStyle from './../../jsStyles/PostItemPlaceholder.styles.js';




const PostItemPlaceholder = (props) => {
  const ph = { //placeholder 
    text : {
      width: '100%',
      height:'16px',
      marginBottom:'0.5rem'
    }
  };
  const s1 = PostItemPlaceholder;
  const s2 = PostItemStyle,
        s_header_title = {...s2.header_title, ...ph.text};
  return( 
    <Card style={s1.body}> 
      { 
        <Figure style={s2.avatar} avatar circle size="small" />
      }
      <header style={s2.header}> 
        <CardTitle className="animated-background" style={s_header_title}></CardTitle> 
        <small className="PostItem__date animated-background" style={{display:'block', width:'70px', height:'16px'}}></small>
      </header>

      {
        /*<div style={s2.header}> 
        <CardTitle style={s2.header_title}>{p.data.title}</CardTitle> 
        <small className="PostItem__date">
          <DateFormat millisec={p.data.date} />
        </small>
      </div>*/
      }
      

      {
        <Figure /> 
      } 
      
      {
        /*<CardBody style={s2.cardBody}>   
        <CardText>{p.data.content}</CardText> 
      </CardBody> */
      }

      {
      /*
      <CardFooter className="PostItem__footer"> 
        <div className="PostItem__footer-action"> 
          <Button className="PostItem__btn-action" block>
            <span className="sr-only">Contact</span>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        </div>
      </CardFooter>
      */

      }
    </Card> 
  ); 
}

export default PostItemPlaceholder;