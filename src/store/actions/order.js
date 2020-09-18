// import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const getOrders = () => {
  axios.get('/orders.json')
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
};

