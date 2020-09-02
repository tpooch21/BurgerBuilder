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
    {controls.map(control => {
      return <BuildControl key={control.label} label={control.label} add={() => {props.onAdd(control.type)}} remove={() => {props.onRemoval(control.type)}}/>
    })}
  </div>
);

export default buildControls;