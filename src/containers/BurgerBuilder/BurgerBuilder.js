import React, { Component } from 'react'

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  meat: 1.5,
  cheese: 0.5,
  salad: 0.2,
  bacon: 1
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount = () => {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        });
      })
      .catch(err => {
        this.setState({
          error: true
        });
      });
  }

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

  handleCheckout = () => {
    console.log(this.props);
  }

  purchaseContinueHandler = () => {
    // alert('You continue!');
    // Send data to backend (must append .json to endpoint w/ firebase)

    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {
    const disabledInfo = {...this.state.ingredients};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      price={this.state.totalPrice}
      close={this.closeModal}
      continue={this.purchaseContinueHandler}
      show={this.state.purchasing}/>
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    if (this.state.error) {
      burger = <p>Ingredients can't be loaded</p>;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          close={this.closeModal}>
            {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);