import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  fillOutForm = (event) => {
    const inputType = event.target.name;
    const inputValue = event.target.value;

    if (inputType === 'street' || inputType === 'postalCode') {
      this.setState({
        address: {
          ...this.state.address,
          [inputType]: inputValue
        }
      });
    } else {
      this.setState({
        [inputType]: inputValue
      });
    }
  }

  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingredients);

    this.setState({
        loading: true
      })
      const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          customer: {
              name: this.state.name,
              address: {
                  street: this.state.address.street,
                  postalCode: this.state.address.postalCode
                },
                email: this.state.email
              }
            }
            axios.post('/order.json', order)
              .then(response => {
                  this.setState({ loading: false });
                  this.props.history.push('/');
                })
                .catch(err => {
                    this.setState({ loading: false });
                  });
  }

  render() {
    let form = (
      <form>
        <input className={classes.Input} onChange={this.fillOutForm} value={this.state.name} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} onChange={this.fillOutForm} value={this.state.email} type="text" name="email" placeholder="Your email" />
        <input className={classes.Input} onChange={this.fillOutForm} value={this.state.address.street} type="text" name="street" placeholder="Street address" />
        <input className={classes.Input} onChange={this.fillOutForm} value={this.state.address.postalCode} type="text" name="postal" placeholder="Postal Code" />
        <Button
          btnType="Success"
          clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  };
}

export default connect(mapStateToProps)(ContactData);