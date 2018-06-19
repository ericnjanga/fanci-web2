/**
 * Component rendering a <figure /> which wraps and <imag /> and a <figcaption />
 * - component isn't rendered if img.props is undefined
 * - empty string is displayed if props.alt is undefined
 * - <figcaption /> isn't rendered if img.caption is undefined
 * *-------- NOTE --------
 * If "img" property is not provided, this component renders a placeholder
 */
import React from 'react';
import './Figure.css';


const Figure = (props)=>{
  if (!props.img) {
    return false;
  }

  const p = { ...props};
 
  let borderRadius, sizes,  imgClassName = 'animated-background';

  const avatar = {
    size: {
      'xxl': {
        width : '100px',
        height : '100px',
      },
      'large': {
        width : '60px',
        height : '60px',
      },
      'med': {
        width : '47px',
        height : '47px',
      },
      'small': {
        width : '35px',
        height : '35px',
      }
    }
  };

  if (p.circle) {
    borderRadius = '100%';
  }
  if (p.avatar) {
    sizes = avatar.size[p.size];
  }else{
    imgClassName += ' img-fluid';
    sizes = {width:'100%', height:'200px' };
  }

  let {width, height } = sizes;
  let imgStyle = {borderRadius, width, height }; 
  let figStyle = p.style;
  return ( 
    <figure 
      className={p.className} 
      style={figStyle}>
      {
        p.img ? 
        <img 
          className={imgClassName} 
          src={p.img} 
          alt={p.alt?p.alt:''} 
          style={imgStyle} 
        />
        :
        <div 
          className={imgClassName} 
          style={imgStyle} 
        />
      } 
      {p.caption && <figcaption>{p.caption}</figcaption> }
    </figure>   
  );
}

export default Figure;   