import React, { useEffect } from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  useEffect(() => {
    console.log('[Modal] updating');
  }, [props.show]);

  return (
    <Aux>
      <Backdrop
        show={props.show}
        close={props.close} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;