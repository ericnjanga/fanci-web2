import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item.js';

/**
 * The List receives the props, and iterates over the collection, mapping all the items into an <Item /> component
 * @param {*} collection
 * @param {*} titleKey // Name of the attribute considered as "title"
 * @param {*} textKey // Name of the attribute considered as "text"
 * @param {*} imgKey // Name of the attribute considered as "img"
 * @param {*} style // component optional styling
 */
const List = ({
  collection,
  textKey,
  titleKey,
  imgKey,
  style,
}) => {

  return (
    <ul style={style.container}>
      {
        collection && collection.map((item) => {

          return (
            <Item
              key={item.id}
              title={item[titleKey]}
              text={item[textKey]}
              img={item[imgKey]}
            />
          );

        })
      }
    </ul>
  );

};

/**
 * Component props validation
 */
List.propTypes = {
  collection: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  titleKey: PropTypes.string.isRequired, // the name of the attribute to be displayed
  textKey: PropTypes.string, // (optional)
  imgKey: PropTypes.string, // (optional)
  style: PropTypes.shape({
    container: PropTypes.shape({
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
List.defaultProps = {
  textKey: '',
  imgKey: '',
  style: { // Default styles
    container: {
      margin: '0 auto',
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '410px',
    },
  },
};

export default List;
