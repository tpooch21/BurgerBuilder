import React from 'react';

import classes from './Order.module.css';

const order = props => {
  const orderIngredients = Object.keys(props.ingredients)
    .map(ingredient => {
      return {
        name: ingredient,
        amount: props.ingredients[ingredient]
      }
    });

  const ingredientOutput = orderIngredients.map(ig => {
    return <span
            style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: '5'
            }}
            key={ig.name}>{ig.name} ({ig.amount})</span>
  });

  return (
    <div className={classes.Order}>
      Ingredients: {ingredientOutput}
      <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
    </div>
  )
};

export default order;