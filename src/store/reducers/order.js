import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: []
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS:
      return {
        orders: action.orderData
      };
    default:
      return state;
  }
};

export default ordersReducer;
