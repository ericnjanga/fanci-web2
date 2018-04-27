import React from 'react';
import ReactDOM from 'react-dom';  
import UserAvatar from './../../components__widget/UserAvatar/UserAvatar.js'; 
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
    return( 
      <section className={'VerticalNav' +(isActive?' is-active':'')}>
        <nav> 
          <div className="VerticalNav__navs">
            { 
              user && <UserAvatar item={user}> 
                <p>{user.displayName}</p>
              </UserAvatar>
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