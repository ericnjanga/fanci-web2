let formStyle = {
  label: {
    margin: '0', 
    color: 'rgb(156, 161, 167)',
    fontWeight: 'lighter',
    position: 'absolute',
    top: '-10px',
    left: '10px',
    padding: '0 10px 0 2px',
    backgroundColor: '#fff'
  },
  file: {
    className: 'btn btn-info btn-block',
    input: { 
      width: '0.1px',
      height: '0.1px',
      opacity: '0',
      overflow: 'hidden',
      position: 'absolute',
      zIndex: '-1' 
    },
    label: null,
    formGroup: null
  },
  formGroup: {
    position: 'relative',
    marginTop: '15px',
    marginBottom: '25px',
    paddingTop: '1rem',
    border: '1px solid #ced4da',
    borderRadius: '.25rem'
  },
  inputField: {
    position: 'relative',
    top: '-2px',
    border: '0px solid #ced4da',
  }
};

formStyle.file.input = {...formStyle.inputField, ...formStyle.file.input}


export default formStyle;


