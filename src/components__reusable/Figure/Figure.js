/**
 * Component rendering a <figure /> which wraps and <imag /> and a <figcaption />
 * - component isn't rendered if img.props is undefined
 * - empty string is displayed if props.alt is undefined
 * - <figcaption /> isn't rendered if img.caption is undefined
 */
import React from 'react';
import './Figure.css';


const Figure = (props)=>{
  const { img, alt, caption } = props;
  return( 
    img && <figure className="Figure">
      <img className="img-fluid" src={img} alt={ alt?alt:''} />
      { caption && <figcaption>{caption}</figcaption> }
    </figure>  
  );
}

export default Figure;