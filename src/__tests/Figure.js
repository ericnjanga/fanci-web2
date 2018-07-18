import React from 'react';
import PropTypes from 'prop-types';


const Figure = ({ src, alt, style, width, height }) => {

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

Figure.defaultProps = {
  src: 'http://via.placeholder.com/1000x1000',
  alt: 'Image placeholder',
  width: '100%',
  height: 'inherit',
  style: { // Component will be styled by default if no "style" object is provided
    figure: {
      margin: 0,
      padding: 0,
      overflowY: 'hidden',
      maxHeight: '200px',
    },
  },
};


export default Figure;
