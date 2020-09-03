import React, { Component } from 'react'

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  meat: 1.5,
  cheese: 0.5,
  salad: 0.2,
  bacon: 1
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  updatePurchaseState = () => {
    const ingredients = {
      ...this.state.ingredients
    };
    const sum = Object.keys(ingredients)
      .reduce((acc, curr) => {
        return acc + ingredients[curr];
      }, 0);

    this.setState({
      purchaseable: sum > 0
    });
  }

  handleIngredientAddition = (type) => {
    this.setState((prevState, props) => {
      const ingredientsUpdated = {...prevState.ingredients};
      ingredientsUpdated[type] = ingredientsUpdated[type] + 1;

      const priceAddition = INGREDIENT_PRICES[type];

      return {
        ingredients: ingredientsUpdated,
        totalPrice: prevState.totalPrice + priceAddition
      }
    }, this.updatePurchaseState);
  }

  handleIngredientRemoval = (type) => {
    if (this.state.ingredients[type] === 0) {
      return;
    }

    this.setState((prevState, props) => {
      const ingredientsUpdated = {...prevState.ingredients};
      ingredientsUpdated[type] = ingredientsUpdated[type] - 1;

      const priceRemoval = INGREDIENT_PRICES[type];

      return {
        ingredients: ingredientsUpdated,
        totalPrice: prevState.totalPrice - priceRemoval
      }
    }, this.updatePurchaseState);
  }

  handlePurchase = () => {
    this.setState({
      purchasing: true
    });
  };

  closeModal = () => {
    this.setState({
      purchasing: false
    });
  }

  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          close={this.closeModal}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            close={this.closeModal}
            continue={this.purchaseContinueHandler}
            show={this.state.purchasing}/>
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          onAdd={this.handleIngredientAddition}
          onRemoval={this.handleIngredientRemoval}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          order={this.handlePurchase}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;