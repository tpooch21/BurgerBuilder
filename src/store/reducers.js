// orders, ingredients, price
// Reducer to update ingredients state
/**   removal
 *    additions
 * Price state
 *    removal
 *    additions
 * Orders state
 *    addition of order on checkout
 *
 */
import * as actionTypes from './actions.js';

const initialState = {
  ingredients: {
    meat: 0,
    cheese: 0,
    salad: 0,
    bacon: 0
  },
  totalPrice: 0
};

const INGREDIENT_PRICES = {
  meat: 1.5,
  cheese: 0.5,
  salad: 0.2,
  bacon: 1
};

const ingredientsAndPriceReducer = (state = initialState, action) => {
  let currentAmount;
  let priceOfIngredient;

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      currentAmount = state.ingredients[action.ingredient];
      priceOfIngredient = INGREDIENT_PRICES[action.ingredient];

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: currentAmount + 1
        },
        totalPrice: state.totalPrice + priceOfIngredient
      };
    case actionTypes.REMOVE_INGREDIENT:
      currentAmount = state.ingredients[action.ingredient];
      priceOfIngredient = INGREDIENT_PRICES[action.ingredient];

      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: currentAmount - 1
        },
        totalPrice: state.totalPrice - priceOfIngredient
      };
    default:
      return state;
  }
};

export default ingredientsAndPriceReducer;


