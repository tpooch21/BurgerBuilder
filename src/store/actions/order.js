import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (orderData) => {
  return dispatch => {
    // dispatch(purchaseBurgerStart());
    dispatch(purchaseBurgerStart());
    axios.post('/orders.json', orderData)
      .then(res => {
        console.log(res.data)
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
      .then(res => {
        console.log(res.data);
        const ordersReturned = res.data;
        const ordersUpdated = [];

        // Push all orders into array with ids
        for (let key in ordersReturned) {
          ordersUpdated.push({
            ...ordersReturned[key],
            id: key
          });
        }

        dispatch(fetchOrdersSuccess(ordersUpdated));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
    }
};