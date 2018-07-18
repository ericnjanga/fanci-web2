import React from 'react';
import { storiesOf } from '@storybook/react';
import List from './../__tests/List.js';
import Avatar from './../__tests/Avatar.js';
import { dummyPosts, user } from './../settings/dummy-data.js';


/**
 * List
 * ---------
 */
storiesOf('List', module)
  .add('No text field and No image', () => {

    return (
      <List
        collection={dummyPosts}
        titleKey="title"
      />
    );

  })
  .add('with text field and No image', () => {

    return (
      <List
        collection={dummyPosts}
        titleKey="title"
        textKey="content"
      />
    );

  })
  .add('with text field and image', () => {

    return (
      <List
        collection={dummyPosts}
        titleKey="title"
        textKey="content"
        imgKey="img"
      />
    );

  });


/**
 * Avatar
 * ---------
 */
storiesOf('Avatar', module)
  .add('Extra small & No image', () => {

    return <Avatar />;

  })
  .add('Small & No image', () => {

    return <Avatar size="sm" />;

  })
  .add('Large', () => {

    return <Avatar size="lg" />;

  })
  .add('Extra Large', () => {

    return <Avatar size="xl" />;

  })
  .add('With image', () => {

    return (
      <Avatar
        size="xl"
        alt={user.displayName}
        photoURL={user.photoURL}
      />
    );

  });
