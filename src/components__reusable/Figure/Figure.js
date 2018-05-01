/**
 * Component rendering a <figure /> which wraps and <imag /> and a <figcaption />
 * - component isn't rendered if img.props is undefined
 * - empty string is displayed if props.alt is undefined
 * - <figcaption /> isn't rendered if img.caption is undefined
 */
import React from 'react';
import './Figure.css';


const Figure = (props)=>{ 
  const p = {...props};

  // console.log('xxxxx', p);
  let borderRadius, width, height, imgClassName;
  if(p.circle){
    borderRadius = '100%';
  }
  if(p.avatar){
    switch(p.size){
      case 'xxl' :  
        width = '100px';
        height = '100px';
        break;
      case 'large' :  
        width = '60px';
        height = '60px';
        break;
      case 'med' :  
        width = '47px';
        height = '47px';
        break;
      case 'small' :  
        width = '35px';
        height = '35px';
        break;
      default: //Medium by default
        width = '47px';
        height = '47px';
    }
  }else{
    imgClassName = 'img-fluid';
  }
  let imgStyle = { borderRadius, width, height }; 
  let figStyle = p.style;
  return( 
    p.img && <figure className={p.className} style={figStyle}>
      <img className={imgClassName} src={p.img} alt={ p.alt?p.alt:''} style={imgStyle} />
      { p.caption && <figcaption>{p.caption}</figcaption> }
    </figure>  
  );
}

export default Figure;