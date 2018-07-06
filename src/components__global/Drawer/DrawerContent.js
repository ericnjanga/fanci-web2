import React from 'react';
import MenuPrimary from './../MenuPrimary.js';
import MenuSecondary from './../MenuSecondary.js';
import Figure from './../../components__reusable/Figure/Figure.js';
// import MaterialTitlePanel from './material_title_panel';
import PropTypes from 'prop-types';

const styles = {
  sidebar: {
    width: 256,
    height: '100%',
  },
  overlay: {
    zIndex: 18,
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
    height: '100%',
    backgroundColor: 'white',
  },
  hero: {
    background: 'rgb(140, 163, 173)',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  avatarTitle: {
    margin: '0',
    color: '#fff',
    letterSpacing: '1px',
  },
};

const DrawerContent = (props) => {

  const style = props.style ? { ...styles.sidebar, ...props.style } : styles.sidebar;
  const { user, onToggleVertNav } = props;

  return (
    <div title="Menu" style={style}>
      <div style={styles.hero}>
        {
          user &&
          <div>
            <Figure
              img={user.photoURL}
              alt={user.displayName}
              avatar
              circle
              size="large"
              style={{ margin: '0' }}
            />
            <p style={styles.avatarTitle}>{user.displayName}</p>
          </div>
        }
      </div>
      <div style={styles.content}>
        {
          user && (
            <div>
              <MenuPrimary onToggleVertNav={onToggleVertNav} />
              <div role="presentation" style={styles.divider} />
              <MenuSecondary style={{ item:{padding:'10px 20px'} }} onToggleVertNav={onToggleVertNav} onLogout={props.handleLogout} />
              <div role="presentation" style={styles.divider} />
            </div>
          )
        }
      </div>
    </div>
  );
};

DrawerContent.propTypes = {
  user: PropTypes.object,
  style: PropTypes.object,
  handleLogout : PropTypes.func,
};

export default DrawerContent;