import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component representing an image
 * @param {*} src
 * @param {*} alt
 * @param {*} style
 * @param {*} width
 * @param {*} height
 */
const Figure = ({
  src,
  alt,
  style,
  width,
  height,
}) => {

  return (
    <figure style={style.figure}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={style.img}
      />
    </figure>
  );

};

/**
 * Component props validation
 */
Figure.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.shape({
    figure: PropTypes.shape({
      margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      padding: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  }),
};

/**
 * Component props default values
 */
Figure.defaultProps = {
  src: 'http://via.placeholder.com/1000x1000',
  alt: 'Image placeholder',
  width: '100%',
  height: 'inherit',
  style: { // Default styles
    figure: {
      margin: 0,
      padding: 0,
      overflowY: 'hidden',
      maxHeight: '200px',
    },
  },
};


export default Figure;
