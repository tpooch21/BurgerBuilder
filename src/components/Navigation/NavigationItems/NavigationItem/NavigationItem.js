import React from 'react';

// NavLink automatically determines if a link is active or not
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact
      activeClassName={classes.active}>{props.children}</NavLink>
  </li>
);

export default navigationItem;