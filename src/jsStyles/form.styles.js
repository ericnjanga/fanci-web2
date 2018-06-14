let defaultStyle = {
  label: {
    margin: '0',  
    fontWeight: 'lighter',
    position: 'absolute',
    top: '-10px',
    left: '10px',
    padding: '0 10px 0 2px'
  },
  file: { 
    input: { 
      width: '0.1px',
      height: '0.1px',
      opacity: '0',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: '-1' 
    },
    label: null
  },
  formGroup: {
    position: 'relative',
    marginTop: '15px',
    marginBottom: '25px',
    paddingTop: '1rem',
    border: '1px solid transparent',
    borderRadius: '.25rem'
  },
  inputField: {
    position: 'relative',
    top: '-2px',
    border: '0px solid transparent',
  }
}; 


/**
 * General form theme
 * ------------------
 */
class FormTheme {
  constructor() {
    this.label = {...defaultStyle.label};
    this.file = { 
      input : {...defaultStyle.inputField, ...defaultStyle.file.input},
      formGroup : {
        position: 'relative',
        marginTop: '15px',
        marginBottom: '25px'
      }
    };
    this.file.className = 'btn btn-info btn-block';
    this.formGroup = {...defaultStyle.formGroup};
    this.inputField = {...defaultStyle.inputField};
    this.checkBox = {
      formGroup: { height:'40px' },
      input: {
        position:'relative', top:'20px', left:'20px'
      }
    };
  }
}//FormTheme


/**
 * Form theme (light color)
 * ------------------
 */
class FormThemeLight extends FormTheme {
  constructor() {
    // super({labelColor:'red'});
    super();
    this.label.color = 'rgb(156, 161, 167)';
    this.label.backgroundColor = '#fff';
    this.formGroup.borderColor = 'rgb(156, 161, 167)';
    this.inputField.backgroundColor = '#fff';
  }
}//FormThemeLight


/**
 * Form theme (dark color)
 * ------------------
 */
class FormThemeDark extends FormTheme {
  constructor() {
    // super({labelColor:'red'});
    super();
    this.label.color = '#788e98';
    this.label.backgroundColor = '#cfd8dc';
    this.formGroup.borderColor = '#788e98';
    this.inputField.backgroundColor = '#cfd8dc';
    
  }
}//FormThemeDark
 

export const formStyleLightTheme = new FormThemeLight();
export const formStyleDarkTheme = new FormThemeDark(); 