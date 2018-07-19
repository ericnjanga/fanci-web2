import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure.js';

/**
 * Component representing an avatar
 * (Uses <Figure /> component to render the avatar)
 * @param {*} photoURL
 * @param {*} alt
 * @param {*} size // Avatar size (extra small, small, large, extra large)
 * @param {*} style
 */
const Avatar = ({
  photoURL,
  alt,
  size,
  style,
}) => {

  let width = 0;
  let height = 0;

  switch (size) {

    case 'sm': // small
      width = '55px';
      height = '55px';
      break;

    case 'lg': // large
      width = '75px';
      height = '75px';
      break;

    case 'xl': // extra large
      width = '100px';
      height = '100px';
      break;

    default: // extra small
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

/**
 * Component props validation
 */
Avatar.propTypes = {
  photoURL: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.shape({
  }),
};

/**
 * Component props default values
 */
Avatar.defaultProps = {
  photoURL: 'http://via.placeholder.com/500x500',
  alt: '',
  size: 'xs',
  style: { // Default styles
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
