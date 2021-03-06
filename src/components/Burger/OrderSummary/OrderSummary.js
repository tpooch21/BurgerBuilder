import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients) // [salad, bacon]
      .map(ingredient => {
        return <li key={ingredient}><span style={{ textTransform: 'capitalize' }}>{ingredient}</span>: {props.ingredients[ingredient]}</li>
      });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        btnType="Danger"
        clicked={props.close}>CANCEL</Button>
      <Button
        btnType="Success"
        clicked={props.continue}>CONTINUE</Button>
    </Aux>
  );
};

export default orderSummary;