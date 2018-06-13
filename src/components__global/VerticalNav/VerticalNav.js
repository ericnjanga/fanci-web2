import React from 'react';
import ReactDOM from 'react-dom'; 
import AppDoc from './../../utilities/AppDoc.class.js';   
import Figure from './../../components__reusable/Figure/Figure.js';
import './../../styles/menus.css';
import './VerticalNav.css';


class VerticalNav extends React.Component {  
  componentDidMount(){   
    //Toggle component if select DOM elt is targetted 
    ReactDOM.findDOMNode(this).addEventListener('click', (event) => {  
      AppDoc.actIfNodeIs('.VerticalNav__obstructor, .VerticalNav__navs .nav-item, .VerticalNav__navs .user-avatar', 'is targetted', event, this.props.onCloseVertNav);
    });
  }

  
  render() {
    const { isActive, children, user } = this.props; 
    const styles = {
      avatarFrame : { padding:'20px' },
      avatarTitle : { fontWeight:'bold', fontSize:'1.2rem', marginBottom:'0' }
    };
    return( 
      <section className={'VerticalNav' +(isActive?' is-active':'')}>
        <nav> 
          <div className="VerticalNav__navs">
            { 
              user && <div style={styles.avatarFrame}>
                        <Figure 
                          img={user.photoURL} 
                          alt={user.displayName} 
                          avatar 
                          circle 
                          size="large" 
                          style={{ margin:'0' }} 
                        />
                        <p style={styles.avatarTitle}>{user.displayName}</p>
              </div> 
            } 
            <hr className="hr-menu" /> 
            {children} 
          </div>
        </nav>
        <div className="VerticalNav__obstructor" />
      </section>
    ); 
  }
}

export default VerticalNav;