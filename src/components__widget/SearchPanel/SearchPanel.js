/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react';
import ReactDOM from 'react-dom';  
import FontAwesomeIcon from '@fortawesome/react-fontawesome'; 
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'; 
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

import SearchPanelStyle from './../../jsStyles/searchPanel.styles.js';
import { Button } from 'reactstrap';
import Btn from './../../components__reusable/Btn/Btn.js';
import './SearchPanel.css';


class SearchPanel extends React.Component { 
  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
  }

  focudInput(){
    if(this.props.isActive){
      this.searchInput.current.focus();
    }
  }

  //1) Add focus to search inout
  //2) Add an event handler which deals with closing the search panel
  componentDidMount(){
    this.focudInput();   

    //Close component if non of the elements of the "nodeList" are clicked
    const this_node = ReactDOM.findDOMNode(this); 
    this_node.addEventListener('click', (event) => {  
      const nodeList = document.querySelectorAll('#fanci-search'); 
      for (let node of nodeList) { 
        if(event.path.indexOf(node) < 0){ 
          this.props.toggleSearchPanel();
          break;
        } 
      }  
    });
  }//[end] componentDidMount

  componentDidUpdate(){
    this.focudInput();
  }  

  // computeStyles(param) {
  //   let val = {};
  //   //apply active styles
  //   if(param.isActive){ 
  //     val.panel = {...SearchPanelStyle.panel, ...searchPanelStyle.panel__active};
  //   }else{ 
  //     val.panel = {...searchPanelStyle.panel__active, ...searchPanelStyle.panel};
  //   }
  //   //...
  //   val.inputFrame = {...searchPanelStyle.inputFrame}; 
  //   val.input = {...searchPanelStyle.input};

  //   return {...val};
  // }

  
  render() { 
    const p = {...this.props};
    
    let style_runtime = SearchPanelStyle.computeStyles(p);
    
    const buttonStyle = {
      fab: {

      }
    }




    console.log('**************style_runtime.panel=, ', style_runtime.panel);


    return(  
      <section style={style_runtime.panel} className={'SearchPanel ' +(p.isActive?'active':'')}> 
        <form className="SearchPanel__form"> 
          {
            false && <div>
              <Button style={style_runtime.btnExit} className="btn-post btn-fab" color="primary" onClick={this.toggleModal}>
                  <FontAwesomeIcon style={buttonStyle.fabIcon} icon={faArrowLeft} /> 
                  
                </Button> 

              <Button style={style_runtime.btnReset} className="btn-post btn-fab" color="primary" onClick={this.toggleModal}>
              <FontAwesomeIcon style={buttonStyle.fabIcon} icon={faTimes} /> 
              <span className="sr-only">Write a Message</span> 
            </Button> 
            </div>
          } 




          <section style={style_runtime.inputFrame}> 
            <Btn style={style_runtime.btnExit} icon={faArrowLeft} text='Exit search'>
              <span className="sr-only">Write a Message</span> 
            </Btn>
            <Btn style={style_runtime.btnReset} icon={faTimes} text='Clear Search'>
              <span className="sr-only">Write a Message</span> 
            </Btn>
            <input style={style_runtime.input} ref={this.searchInput} name="fanci-search" id="fanci-search" 
          placeholder="Search a Fanci" type="text" className="form-control" onChange={p.handleSearch}  />
          </section>


        </form>
      </section>  
    ); 
  }
}

export default SearchPanel;