import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
// import Backdrop from '../UI/Backdrop/Backdrop';
import classes from "./Layout.module.css";

/**
 * Layout should indicate to Toolbar/SideDrawer whether user is logged in
 */
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <Toolbar
          open={this.sideDrawerOpenHandler}
          loggedIn={this.props.loggedIn}
        />
        <SideDrawer
          close={this.sideDrawerCloseHandler}
          show={this.state.showSideDrawer}
          loggedIn={this.props.loggedIn}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
