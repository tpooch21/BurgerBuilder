import React, { Component } from 'react'

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };

  handleIngredientAddition = (type) => {
    this.setState((prevState, props) => {
      const ingredientsUpdated = {...prevState.ingredients};
      ingredientsUpdated[type] = ingredientsUpdated[type] + 1;

      return {
        ingredients: ingredientsUpdated
      }
    });
  }

  handleIngredientRemoval = (type) => {
    if (this.state.ingredients[type] === 0) {
      return;
    }

    this.setState((prevState, props) => {
      const ingredientsUpdated = {...prevState.ingredients};
      ingredientsUpdated[type] = ingredientsUpdated[type] - 1;

      return {
        ingredients: ingredientsUpdated
      }
    });
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls onAdd={this.handleIngredientAddition} onRemoval={this.handleIngredientRemoval}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;