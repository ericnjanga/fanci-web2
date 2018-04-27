/**
 * Component rendering an overlay displaying a toast, a spinner and a message
 * - message isn't rendered if img.msg is undefined
 */
import React from 'react';
import './Toast.css';


const Toast = (props) => {
  const { msg } = props;
  return(
    <section className="Toast">
      <div className="Toast__content">
        <div className="lds-css">
          <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
        { msg && <div className="Toast__toast">{msg}</div>}
      </div>
    </section>
  );
}

export default Toast;