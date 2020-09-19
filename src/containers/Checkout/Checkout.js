import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

  handleReturnToHome = () => {
    this.props.history.push('/');
  }

  checkoutContinuedHandler = () => {
    this.props.history.push('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      summary = (
        <CheckoutSummary
          ingredients={this.props.ingredients}
          return={this.handleReturnToHome}
          continue={this.checkoutContinuedHandler}/>
      );
    }

    return (
      <div>
        {summary}
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);