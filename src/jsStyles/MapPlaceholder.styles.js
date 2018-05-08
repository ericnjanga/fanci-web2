
let MapPHStyles = { 
  body : { 
    position: 'relative',
    background: '#EEE5E0',
    width: '100%',
    height: '100%'
  },
  user : {  
    position: 'absolute',
    display: 'block',
    borderRadius: '100%',
    width: '35px',
    height: '35px',
    border: '5px solid #999'
  },
  mainUser : {
    top:'50%',
    left:'50%',
    marginTop: '-30px',
    marginLeft: '-30px',
  } 
};

MapPHStyles.mainUser = {...MapPHStyles.mainUser, ...MapPHStyles.user, width:'60px', height:'60px' };


export default MapPHStyles;