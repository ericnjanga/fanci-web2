import React from 'react';
import PropTypes from 'prop-types';


const Figure = ({ src, alt, style }) => {

  return (
    <figure style={style.figure}>
      <img src={src} alt={alt} style={style.img} />
    </figure>
  );

};

Figure.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
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
    img: PropTypes.shape({
      width: PropTypes.string,
    }),
  }),
};

Figure.defaultProps = {
  style: { // Component will be styled by default if no "style" object is provided
    figure: {
      margin: 0,
      padding: 0,
      overflowY: 'hidden',
      maxHeight: '200px',
    },
    img: {
      width: '100%',
    },
  },
};




export default Figure;
