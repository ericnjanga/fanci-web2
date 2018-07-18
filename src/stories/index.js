import React from 'react';
import { storiesOf } from '@storybook/react';
import List from './../components/List.js';


const posts = [
  {
    content: 'Bear claw gingerbread toffee gummi bears cake tart topping carrot cake. Jelly pie bonbon chocolate liquorice jelly caramels. Toffee chocolate bar sweet roll fruitcake toffee dragée. Toffee sugar plum …',
    date: 1530566158145,
    expiry: '3',
    expiryDate: 1531170958145,
    file: 'timeline/kobe-GQ1.jpg',
    img: "https://firebasestorage.googleapis.com/v0/b/fanci-dev.appspot.com/o/timeline%2Fw-art2_josey1.jpg?alt=media&token=e698972c-d4ff-4638-ae97-bd09f77aa5dd",
    id: '-LGNPl9YYI5pzMDu-KoH',
    location: 'Icing pudding tiramisu biscuit tootsie roll.',
    places: '1',
    title: 'Josey in concert',
    uid: '0D2s9A7OyLQqZJS6sdse1SZgspK2',
  },
  {
    content: 'Candy biscuit wafer biscuit sesame snaps tiramisu pudding tiramisu cake. Jujubes jujubes donut. Tiramisu caramels wafer biscuit sweet roll. Dragée ice cream cake soufflé toffee sesame snaps cake liquo…',
    date: 1530713675577,
    expiry: '3',
    expiryDate: 1531318475577,
    file: 'timeline/kobe-GQ3.jpg',
    img: "https://firebasestorage.googleapis.com/v0/b/fanci-dev.appspot.com/o/timeline%2Fkobe-GQ3.jpg?alt=media&token=2fb06a3e-e3e8-43fb-afd7-b514793db30c",
    id: '-LGRp_jf-YVfNynw-SmW',
    location: 'candy canes fruitcake',
    places: '3',
    title: 'Kobe looking sharp',
    uid: 'da2IEIoFyoZ4Y13ecuPJSSHBA1v1',
  },
  {
    content: 'Sweet roll cookie toffee icing. Cotton candy carrot cake pastry tootsie roll danish jelly-o sweet cookie. Gummies topping cotton candy. Cake ice cream muffin tootsie roll biscuit pastry lollipop tart …',
    date: 1530713819398,
    expiry: '3',
    expiryDate: 1531318619398,
    file: 'timeline/kobe35.jpg',
    img: "https://firebasestorage.googleapis.com/v0/b/fanci-dev.appspot.com/o/timeline%2Fkobe35.jpg?alt=media&token=73d22bdd-9dad-4908-8518-33dc1ce98d7a",
    id: '-LGRpFcBftCR_s-NyHGd',
    location: 'Icing pudding jelly chocolate candy ',
    places: '2',
    title: "Kobe's Final Jersey",
    uid: 'Gk64t4bCAMedstd5h1Z9BzkTufp2',
  },
  {
    content: 'Powder pie liquorice croissant gummi bears soufflé lemon drops. Muffin caramels chocolate biscuit. Dessert chocolate cake carrot cake sugar plum caramels. Marzipan tart tootsie roll. Chupa chups chupa…',
    date: 1530566069428,
    expiry: '3',
    expiryDate: 1531170869428,
    file: 'timeline/muhammad-ali.jpg',
    img: "https://firebasestorage.googleapis.com/v0/b/fanci-dev.appspot.com/o/timeline%2Fmuhammad-ali.jpg?alt=media&token=16207a0f-ac05-4817-b988-6beda2b6c721",
    id: '-LGRqBmPLixmfl8pMbzI',
    location: 'Chupa chups chupa chups tootsie',
    places: '3',
    title: 'Chupa chups chupa chups tootsie',
    uid: 'da2IEIoFyoZ4Y13ecuPJSSHBA1v1',
  },
];


storiesOf('List', module)
  .add('No text field and No image', () => (
    <List collection={posts} titleKey="title" />
  ))

storiesOf('List', module)
  .add('with text field and No image', () => (
    <List collection={posts} titleKey="title" textKey="content" />
  ))

  storiesOf('List', module)
    .add('with text field and image', () => (
      <List collection={posts} titleKey="title" textKey="content" imgKey="img" />
    ))
