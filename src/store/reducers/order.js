import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true })
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };

      const updatedStatePieces = {
        loading: false,
        purchased: true,
        orders: newOrder
      };

      return updateObject(state, updatedStatePieces);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.FETCH_ORDERS_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      const updatedState = {
        orders: action.orders,
        loading: false
      };
      return updateObject(state, updatedState);
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });
    default:
      return state;
  }
};

export default ordersReducer;
