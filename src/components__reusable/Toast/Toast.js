/**
 * Component rendering an overlay displaying a toast, a spinner and a message
 * - message isn't rendered if img.msg is undefined
 */
import React from 'react';
import './Toast.css';


const Toast = (props) => {
  const { msg } = props;
  const style = {
    toast : {
      position: 'fixed',
      display: 'flex',
      alignItems: 'center', 
      flexDirection: 'column',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: '1000'
    },
    box : { 
      padding: '10px 10px 20px 10px',
      marginTop: '200px',
      background: '#ddd',
      fontSize: '0.85rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '200px',
      textAlign: 'center'
    },
    spinnerBox: { 
      position: 'relative',
      width:'100%',
      height:'100%'
    },
    msg : {
      position: 'relative', 
      color: '#333',
      zIndex: '1010', 
      borderRadius:' 5px',
    }, 
    spinnerDiv : {
      left: '94px',
      top: '48px',
      position: 'absolute',
      animation: 'lds-spinner linear 1s infinite',
      background: '#333',
      width: '12px',
      height: '24px',
      borderRadius: '40%',
      transformOrigin: '6px 52px'
    }
  };
  let spinnerDiv = Array(12).fill(0); 

  return( 
    <section className="Toast" style={style.toast}>
      <div className="Toast__content" style={style.box}>
        <div className="lds-css">
          <div className="lds-spinner" style={style.spinnerBox}>
            {
              spinnerDiv.map((item, index)=>
                <div key={index} />
              ) 
            }
          </div>
        </div>
        { msg && <div className="Toast__toast" style={style.msg}>{msg}</div>}
      </div>
    </section>
  );
}

export default Toast;