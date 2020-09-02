import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients) // [meat, cheese, bacon]
      .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { // Create an array for each ingredient, length of which matches the number of each ingredient to add
          return <BurgerIngredient key={igKey + i} type={igKey}/> // Map over the array for each ingredient, and return that number of BurgerIngrdients
        }); // [ , ]
      })
      .reduce((acc, curr) => {
        return acc.concat(curr);
      }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Start Building Your Burger!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default burger;