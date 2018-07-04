
const style = {

  panel: {
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
  inputFrame: {
    position: 'relative',
    top: '0px',
  },
  inputFrame__btns: {
    position: 'absolute',
    top: '0',
    color: '#333',
    backgroundColor: 'transparent',
    border: '0px solid',
    zIndex: '2',
    height: '38px', 
    width: '35px'
  },
  btnExit: {
    left: '0',
  },
  btnReset: {
    right: '0',
  },
  input: {
    position: 'relative',
    paddingLeft: '40px',
    paddingRight: '35px',
    zIndex: '1',
  },
};// style



class SearchPanelStyle {

  static computeStyles(param) {

    const val = {};
    // apply active styles
    if (param.isActive) {

      val.panel = { ...style.panel, ...style.panel__active };

    } else {

      val.panel = { ...style.panel__active, ...style.panel };

    }

    val.inputFrame = { ...style.inputFrame };
    val.input = { ...style.input };
    val.btnExit = { ...style.inputFrame__btns, ...style.btnExit };
    val.btnReset = { ...style.inputFrame__btns, ...style.btnReset };

    return { ...val };

  }
}// SearchPanelStyle


export default SearchPanelStyle;
