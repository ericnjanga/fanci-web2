import React from 'react';
import MenuPrimary from './../MenuPrimary.js';
import MenuSecondary from './../MenuSecondary.js';
// import MaterialTitlePanel from './material_title_panel';
import PropTypes from 'prop-types';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    height: '100%',
    backgroundColor: 'white',
  },
  hero: {
    background: 'rgb(140, 163, 173)',
    height: '100px',
  }
};

const SidebarContent = (props) => {
  const style = props.style ? {...styles.sidebar, ...props.style} : styles.sidebar;

  const links = [];

  // for (let ind = 0; ind < 10; ind++) {
  //   links.push(
  //     <a key={ind} href="#" style={styles.sidebarLink}>Mock menu item {ind}</a>);
  // }

  return (
    <div title="Menu" style={style}>
      <div style={styles.hero}>

      </div>
      <div style={styles.content}>
        <MenuPrimary />
        <hr className="hr-menu" />
        <MenuSecondary onLogout={props.handleLogout} />

        <hr className="hr-menu" />
        <hr className="hr-menu" />
        <hr className="hr-menu" />

        <a href="index.html" style={styles.sidebarLink}>Home</a>
        <a href="responsive_example.html" style={styles.sidebarLink}>Responsive Example</a>
        <div style={styles.divider} />
        {links}
      </div>
    </div>
  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
  handleLogout : PropTypes.func,
};

export default SidebarContent;