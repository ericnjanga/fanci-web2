import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure.js';


const Avatar = ({ photoURL, alt, size, style }) => {

  let width = 0;
  let height = 0;

  switch (size) {

    case 'sm':
      width = '55px';
      height = '55px';
      break;

    case 'lg':
      width = '75px';
      height = '75px';
      break;

    case 'xl':
      width = '100px';
      height = '100px';
      break;

    default:
      width = '35px';
      height = '35px';
  }

  return (
    <Figure
      src={photoURL}
      alt={alt}
      width={width}
      height={height}
      style={style}
    />
  );

};

Avatar.propTypes = {
  photoURL: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.shape({
  }),
};

Avatar.defaultProps = {
  photoURL: 'http://via.placeholder.com/500x500',
  alt: '',
  size: 'xs',
  style: {
    figure: {
      margin: 0,
      padding: 0,
      borderRadius: '100px',
    },
    img: {
      borderRadius: '100px',
    },
  },
};

export default Avatar;
