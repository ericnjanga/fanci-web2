import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ModalConfirm = (props)=> {
  const p = {...props};

  const style = {
    header: {
      borderBottom: '0px solid',
      paddingBottom: '0'
    },
    footer: {
      borderTop: '0px solid'
    },
    ctaBtn: {
      minWidth: '100px',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
    btnNo: {
      color: 'rgba(0,0,0,0.54)',
      border: '0px solid',
      backgroundColor: 'transparent'
    },
    btnYes: {
      boxShadow: '0 2px 5px 0 rgba(0,0,0,0.26)'
    }
  };
   
  /**
   * Not providing toggle={...}       : Removes 'x' button from ModalHeader
   * backdrop={'static'}  : Prevents from being closed by clicking on the "backdrop"
   */
  return( 
    <Modal isOpen={p.isOpen} toggle={p.toggle} backdrop={'static'}>
      <ModalHeader style={style.header}>{p.title}</ModalHeader>
      <ModalBody>
        {p.children}
      </ModalBody>
      <ModalFooter style={style.footer}>
        <Button style={{...style.ctaBtn, ...style.btnNo}} color="secondary" onClick={()=>{ p.toggle(false); } }>No</Button>{' '}
        <Button style={{...style.ctaBtn, ...style.btnYes}} color="primary" onClick={()=>{ p.toggle(true); } }>Yes</Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalConfirm;