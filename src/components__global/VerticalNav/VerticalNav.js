import React from 'react';
import ReactDOM from 'react-dom';   
import Figure from './../../components__reusable/Figure/Figure.js';
import './../../styles/menus.css';
import './VerticalNav.css';


class VerticalNav extends React.Component {  
  componentDidMount(){   
    //Close navigation only is certain nodes are targetted
    const this_node = ReactDOM.findDOMNode(this);
    this_node.addEventListener('click', (event) => { 
      const nodeList = document.querySelectorAll('.VerticalNav__obstructor, .VerticalNav__navs .nav-item, .VerticalNav__navs .user-avatar'); 
      for (let node of nodeList) { 
        if(event.path.indexOf(node) > -1){
          this.props.onCloseVertNav();
          break;
        } 
      }  
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
                        <Figure img={user.photoURL} alt={user.displayName} avatar circle size="large" style={{ margin:'0' }} />
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