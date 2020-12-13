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
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  meat: 1.5,
  cheese: 0.5,
  salad: 0.2,
  bacon: 1,
};

// Example of how switch statement logic can be extracted
const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredient]: state.ingredients[action.ingredient] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const priceOfIngredient = INGREDIENT_PRICES[action.ingredient];
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + priceOfIngredient,
    building: true,
  };
  return updateObject(state, updatedState);
};

const ingredientsAndPriceReducer = (state = initialState, action) => {
  let currentAmount;
  let priceOfIngredient;

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      currentAmount = state.ingredients[action.ingredient];
      priceOfIngredient = INGREDIENT_PRICES[action.ingredient];

      if (currentAmount) {
        return {
          ...state,
          ingredients: {
            ...state.ingredients,
            [action.ingredient]: currentAmount - 1,
          },
          totalPrice: state.totalPrice - priceOfIngredient,
          building: true,
        };
      } else {
        return state;
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default ingredientsAndPriceReducer;
