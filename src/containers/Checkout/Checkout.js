import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {

  componentWillMount() {
    this.props.onInitPurchase();
  }

  handleReturnToHome = () => {
    this.props.history.push('/');
  }

  checkoutContinuedHandler = () => {
    this.props.history.push('/checkout/contact-data');
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            return={this.handleReturnToHome}
            continue={this.checkoutContinuedHandler}/>
          <Route
            path={this.props.match.url + '/contact-data'}
            component={ContactData}/>
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitPurchase: () => dispatch(actionCreators.purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);