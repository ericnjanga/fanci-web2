import React from 'react';
import List from './List.js';
import PropTypes from 'prop-types';


const TestViewList = ({ posts }) => {

  console.log('.....posts=', posts);
  return (
    <List
      collection={posts}
      titleKey="title"
      imgKey="img"
      textKey="content"
    />
  );

};

TestViewList.propTypes = {
  postList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default TestViewList;
