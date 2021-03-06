import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount = () => {
    this.props.handleFetchIngredients();
  };

  updatePurchaseState = () => {
    const ingredients = {
      ...this.props.ingredients,
    };
    const sum = Object.keys(ingredients).reduce((acc, curr) => {
      return acc + ingredients[curr];
    }, 0);

    return sum > 0;
  };

  handlePurchase = () => {
    if (this.props.isAuth) {
      this.setState({
        purchasing: true,
      });
    } else {
      this.props.history.push("/auth");
      this.props.setAuthRedirect("/checkout");
    }
  };

  closeModal = () => {
    this.setState({
      purchasing: false,
    });
  };

  handleCheckout = () => {
    console.log(this.props);
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />;
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            onAdd={this.props.handleIngredientAddition}
            onRemoval={this.props.handleIngredientRemoval}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseState()}
            order={this.handlePurchase}
            auth={this.props.isAuth}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          close={this.closeModal}
          continue={this.purchaseContinueHandler}
          show={this.state.purchasing}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    if (this.props.error) {
      burger = <p>Ingredients can't be loaded</p>;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} close={this.closeModal}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleIngredientAddition: (ing) => dispatch(actions.addIngredient(ing)),
    handleIngredientRemoval: (ing) => dispatch(actions.removeIngredient(ing)),
    handleFetchIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    setAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
