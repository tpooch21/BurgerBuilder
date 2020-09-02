import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Bacon', type: 'bacon' }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <p><strong>Current Price: {props.price.toFixed(2)}</strong></p>
    {controls.map(control => {
      return <BuildControl
                key={control.label}
                label={control.label}
                add={() => {props.onAdd(control.type)}}
                remove={() => {props.onRemoval(control.type)}}
                disabled={props.disabled[control.type]}/>
    })}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}>ORDER NOW</button>
  </div>
);

export default buildControls;