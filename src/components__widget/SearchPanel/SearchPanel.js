/**
 * Component rendering a card with details
 * - Fetches a specific user info when component mounts
 */ 
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

import PostItem from './../../components__widget/PostItem/PostItem.js';
import { Alert } from 'reactstrap';

import SearchPanelStyle from './../../jsStyles/searchPanel.styles.js';
import './SearchPanel.css';


class SearchPanel extends React.Component {
  constructor(props) {
    super(props);
    this.inputExit          = React.createRef();
    this.inputReset         = React.createRef();
    this.inputSearch        = React.createRef();
    this.exitSearch         = this.exitSearch.bind(this);
    this.clearSearch        = this.clearSearch.bind(this);
    this.handlePostSearch   = this.handlePostSearch.bind(this);
    this.state = {
      list : null
    };
  }
  

  // Filter the original list of fancies against user search input
  // and updatge the state with the resulting array
  handlePostSearch(event) {
    const value = event;
    let searchVal = value ? event.target.value : '' ; 
    let list = this.props.postList_search; 
    let postList_search = list.filter((item) => { 
      return item.title.toLowerCase().search(searchVal) > -1;
    });
    this.setState({ list: postList_search });
  }

  exitSearch(event) {
    event.preventDefault();
    this.clearSearch(event);
    this.props.toggleSearchPanel();
  }

  // Clear search field (this will restore item list)
  clearSearch(event) {
    event.preventDefault();
    this.inputSearch.current.value = '';
    this.handlePostSearch('');
  }


  focudInput() {
    if (this.props.isActive) {
      this.inputSearch.current.focus();
    }
  }    

  //1) Add focus to search inout
  //2) Add an event handler which deals with closing the search panel
  componentDidMount() {
    this.focudInput(); 
    this.setState({ list: this.props.postList_search });
  }// [end] componentDidMount

  componentDidUpdate() {
    this.focudInput();
  } 
  
  render() {
    const p = { ...this.props};
    const s = { ...this.state};
    let style_runtime = SearchPanelStyle.computeStyles(p);
    const style = {
      container: { maxWidth: '440px', marginLeft: 'auto', marginRight: 'auto' },
    }
    style.searchContainer = { 
      overflowY: 'scroll', 
      height: 'calc(100% - 40px)', 
      marginTop: '20px', 
      ...style.container 
    }

    return ( 
      <section 
        style={style_runtime.panel} 
        className={'SearchPanel ' +(p.isActive?'active':'')}> 
        <form className="SearchPanel__form" style={style.container}>

          <section style={style_runtime.inputFrame}> 
            <button 
              ref={this.inputExit}
              className="SearchPanel__btnExit"
              onClick={this.exitSearch}
              style={style_runtime.btnExit}>
              <FontAwesomeIcon 
                icon={faArrowLeft} 
              /> 
              <span className="sr-only">Exit search</span> 
            </button>
            
            <button 
              ref={this.inputReset} 
              onClick={
                (event)=>this.clearSearch(event)
              } 
              style={style_runtime.btnReset}>
              <FontAwesomeIcon 
                icon={faTimes} 
              /> 
              <span className="sr-only">Clear Search</span> 
            </button>

            <input 
              ref={this.inputSearch}
              style={style_runtime.input} 
              name="fanci-search" 
              id="fanci-search" 
              placeholder="Search a Fanci" 
              type="text" 
              className="form-control" 
              onChange={this.handlePostSearch}  
            />
          </section>
        </form>
        

        <div style={style.searchContainer}>
          {
            // Display all posts items
            s.list && s.list.length ? s.list.map((item) => {

              return (
                <PostItem
                  key={item.id}
                  data={item}
                  displayIfExpired={p.displayExpiredItems}
                  style={{ marginBottom: '20px' }}
                  isCompressed
                />
              );

            }) : 
            <Alert color="info">No item found!</Alert>
          }
        </div>


      </section>  
    );
  }
}

export default SearchPanel;