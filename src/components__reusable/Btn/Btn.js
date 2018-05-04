
import React from 'react';
import { Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';  

const Btn = (props)=> {
  console.log('>>>Button=', Button);
  const p = props;
  return(
    <Button {...p}>
      { p.icon && <FontAwesomeIcon icon={p.icon} />  }
      { p.children }
    </Button>
  );
}

export default Btn;