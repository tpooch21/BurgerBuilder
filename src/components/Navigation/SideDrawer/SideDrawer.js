import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

const sideDrawer = props => {
  // css classes for animation
  const sideDrawerOpenOrClosed = [classes.SideDrawer, classes.Close];
  if (props.show) {
    sideDrawerOpenOrClosed[1] = classes.Open;
  }

  return (
    <Aux>
      <Backdrop
        show={props.show}
        close={props.close}/>
      <div className={sideDrawerOpenOrClosed.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;