import React, { Component } from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

// Class and functional components offer different approaches to updating Modal (and child OrderSummary)
class Modal extends Component {

  shouldComponentUpdate = (prevProps) => {
    return prevProps.show !== this.props.show;
  }

  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          close={this.props.close} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
};

// const Modal = props => {
//   useEffect(() => {
//     console.log('[Modal] updating');
//   }, [props.show]);

//   return (
//     <Aux>
//       <Backdrop
//         show={props.show}
//         close={props.close} />
//       <div
//         className={classes.Modal}
//         style={{
//           transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//           opacity: props.show ? '1' : '0'
//         }}>
//         {props.children}
//       </div>
//     </Aux>
//   );
// };

export default Modal;