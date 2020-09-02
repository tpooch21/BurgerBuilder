import React from 'react';

import Aux from '../../hoc/Aux';
import Backdrop from '../UI/Backdrop/Backdrop';
import classes from './Layout.module.css';

const layout = ( props ) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <Backdrop show={props.show}/>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;