class SearchPanelStyle {
  // constructor(){
    static style = {
      panel : {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        padding: '20px',
        background: 'rgba(0,0,0,0.7)',
        border: '0',
        zIndex: '-1',
        opacity: '0',
      },
      panel__active: { 
        zIndex: '100',
        opacity: '1',
      },
      inputFrame : {
        position: 'relative',
        top: '0px'
      },
      inputFrame__btns : {
        position: 'absolute', 
        top: '0',
        color: '#333',
        backgroundColor: 'transparent',
        border: '0px solid',
        zIndex: '2'
      },
      btnExit : {
        left: '0'
      },
      btnReset : {
        right: '0'
      },
      input : { 
        position: 'relative',
        paddingLeft: '40px',
        paddingRight: '35px',
        zIndex: '1'
      }
    }//this.style
  // }



  static computeStyles(param) {
    let val = {};
    //apply active styles
    if(param.isActive){ 
      val.panel = {...this.style.panel, ...this.style.panel__active};
    }else{ 
      val.panel = {...this.style.panel__active, ...this.style.panel};
    }
    //...
    val.inputFrame = {...this.style.inputFrame};  
    val.input = {...this.style.input};
    val.btnExit = {...this.style.inputFrame__btns, ...this.style.btnExit};
    val.btnReset = {...this.style.inputFrame__btns, ...this.style.btnReset};
  
    return {...val};
  }
}




export default SearchPanelStyle;
