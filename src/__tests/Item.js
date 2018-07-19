import React from 'react';
import PropTypes from 'prop-types';
import Figure from './Figure.js';

/**
 * Component representing an item
 * @param {*} title
 * @param {*} text
 * @param {*} img
 * @param {*} style
 */
const Item = ({
  title,
  text,
  img,
  style,
}) => {

  return (
    <li style={style.container}>
      <h3 style={style.title}>{title}</h3>
      { img && <Figure src={img} alt={title} /> }
      { text && <div style={style.text}>{text}</div> }
    </li>
  );

};

/**
 * Component props validation
 */
Item.propTypes = {
  title: PropTypes.string.isRequired, // specify the optional field
  text: PropTypes.string, // (optional)
  img: PropTypes.string, // (optional)
  style: PropTypes.shape({
    container: PropTypes.shape({
      listStyle: PropTypes.string,
      margin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      padding: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
    title: PropTypes.shape({
      margin: PropTypes.string,
    }),
  }),
};

/**
 * Component props default values
 */
Item.defaultProps = {
  text: '',
  img: '',
  style: { // Default styles
    container: {
      listStyle: 'none',
      margin: '50px 0',
      background: '#fff',
      borderRadius: '.25rem',
      boxShadow: '0px 0px 1px 0px rgba(160,160,160,1)',
    },
    title: {
      margin: '0',
      padding: '20px',
      textAlign: 'left',
      fontWeight: '300',
      fontSize: '29px',
    },
    text: {
      padding: '20px',
      textAlign: 'left',
      lineHeight: '25px',
    },
  },
};

export default Item;
