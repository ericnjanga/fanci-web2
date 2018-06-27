import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import modalStyle from './../../jsStyles/modal.styles.js';


const ModalConfirm = (props)=> {
  const p = { ...props}; 
   
  /**
   * Not providing toggle={ ...}       : Removes 'x' button from ModalHeader
   * backdrop={'static'}  : Prevents from being closed by clicking on the "backdrop"
   */
  return (
    <Modal isOpen={p.isOpen} toggle={p.toggle} backdrop={'static'}>
      <ModalHeader style={modalStyle.header}>{p.title}</ModalHeader>
      <ModalBody>
        {p.children}
      </ModalBody>
      <ModalFooter style={modalStyle.footer}>
        <Button style={{ ...modalStyle.ctaBtn, ...modalStyle.btnNo}} color="secondary" onClick={() => {p.toggle(false); } }>No</Button>{' '}
        <Button style={{ ...modalStyle.ctaBtn, ...modalStyle.btnYes}} color="primary" onClick={() => {p.toggle(true); } }>Yes</Button>
      </ModalFooter>
    </Modal>
  );
}

export default ModalConfirm;