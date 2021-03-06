import React from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import MenuButton from "./MenuButton/MenuButton";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <MenuButton clicked={props.open} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems auth={props.loggedIn} />
    </nav>
  </header>
);

export default toolbar;
