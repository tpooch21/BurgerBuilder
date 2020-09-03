import React from 'react';

import Logo from '../../../Logo/Logo';
import classes from './MenuButton.module.css';

const menuButton = props => (
  <div
    className={classes.MenuButtonLogo}
    onClick={props.clicked}>
    <Logo />
  </div>
);

export default menuButton;