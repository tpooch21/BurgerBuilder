import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({ auth }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {auth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {auth ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </ul>
);

export default NavigationItems;
