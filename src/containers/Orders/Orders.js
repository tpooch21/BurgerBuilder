import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/order.json')
      .then(res => {
        console.log(res.data);
        const ordersReturned = res.data;
        const ordersUpdated = [];

        for (let key in ordersReturned) {
          ordersUpdated.push({
            ...ordersReturned[key],
            id: key
          });
        }

        this.setState({
          orders: ordersUpdated,
          loading: false
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => {
          return <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);