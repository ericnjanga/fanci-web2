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
  let phs = {};
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
  //...
  phs.body = {...s1.body, ...props.style};
  return( 
    <Card style={phs.body }> 
      { 
        <Figure style={s2.avatar} avatar circle size="small" />
      }
      <header style={s2.header}> 
        <CardTitle 
          className="animated-background" 
          style={s_header_title} /> 
        <small 
          className="PostItem__date animated-background" 
          style={{display:'block', width:'70px', height:'16px'}}
        />
      </header>
  
      {
        <Figure /> 
      }  
    </Card> 
  ); 
}

export default PostItemPlaceholder;