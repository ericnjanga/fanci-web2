/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react';
import ReactDOM from 'react-dom';
import AppDoc from './../../utilities/AppDoc.class.js';
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
    this.btnExit = React.createRef();
    this.btnReset = React.createRef();
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
    //Toggle component if select DOM elt is targetted 
    ReactDOM.findDOMNode(this).addEventListener('click', (event) => {
      event.preventDefault(); 
      AppDoc.actIfNodeIs('.SearchPanel__btnExit', 'is targetted', event, this.props.toggleSearchPanel);
    });
  }//[end] componentDidMount

  componentDidUpdate(){
    this.focudInput();
  } 
  
  render() { 
    const p = {...this.props};
    let style_runtime = SearchPanelStyle.computeStyles(p);

    return ( 
      <section 
        style={style_runtime.panel} 
        className={'SearchPanel ' +(p.isActive?'active':'')}> 
        <form className="SearchPanel__form"> 
          {
            false && <div>
              <Button 
                style={style_runtime.btnExit} 
                className="btn-post btn-fab" 
                color="primary" 
                onClick={this.toggleModal}>
                <FontAwesomeIcon icon={faArrowLeft} />  
              </Button> 

              <Button 
                style={style_runtime.btnReset} 
                className="btn-post btn-fab" 
                color="primary" 
                onClick={this.toggleModal}>
                <FontAwesomeIcon icon={faTimes} /> 
                <span className="sr-only">Write a Message</span> 
              </Button> 
            </div>
          } 




          <section style={style_runtime.inputFrame}> 
            <Btn 
              className="SearchPanel__btnExit" 
              style={style_runtime.btnExit} 
              icon={faArrowLeft} 
              text='Exit search'>
              <span className="sr-only">Write a Message</span> 
            </Btn>
            <Btn 
              className="SearchPanel__btnReset" 
              style={style_runtime.btnReset} 
              icon={faTimes} 
              text='Clear Search'>
              <span className="sr-only">Reset Your Search</span> 
            </Btn>
            <input 
              style={style_runtime.input} 
              ref={this.searchInput} 
              name="fanci-search" 
              id="fanci-search" 
              placeholder="Search a Fanci" 
              type="text" 
              className="form-control" 
              onChange={p.handleSearch}  
            />
          </section>


        </form>
      </section>  
    ); 
  }
}

export default SearchPanel;