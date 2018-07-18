import React from 'react';
import { storiesOf } from '@storybook/react';
import List from './../__tests/List.js';
import { dummyPosts } from './../settings/dummy-data.js';


/**
 * List
 * ---------
 */
storiesOf('List', module)
  .add('No text field and No image', () => {

    return <List collection={dummyPosts} titleKey="title" />;

  })
  .add('with text field and No image', () => {

    return <List collection={dummyPosts} titleKey="title" textKey="content" />;

  })
  .add('with text field and image', () => {

    return <List collection={dummyPosts} titleKey="title" textKey="content" imgKey="img" />;

  });


/**
 * Avatar
 * ---------
 */
storiesOf('Avatar', module)
  .add('No text field and No image', () => {

    return <List collection={dummyPosts} titleKey="title" />;

  })
  .add('with text field and No image', () => {

    return <List collection={dummyPosts} titleKey="title" textKey="content" />;

  })
  .add('with text field and image', () => {

    return <List collection={dummyPosts} titleKey="title" textKey="content" imgKey="img" />;

  });
