/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react';
import ReactDOM from 'react-dom';  
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

  render() {
    const p = {...this.props};
    return(  
      <section className={'SearchPanel ' +(p.isActive?'active':'')}> 
        <form className="SearchPanel__form">
          <input ref={this.searchInput} name="fanci-search" id="fanci-search" 
          placeholder="Search a Fanci" type="text" className="form-control" onChange={p.handleFilter}  />
        </form>
      </section>  
    ); 
  }
}

export default SearchPanel;