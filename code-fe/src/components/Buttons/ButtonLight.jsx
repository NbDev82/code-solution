import React from 'react';
import './Button.scss';

function ButtonLight(props) {
  return <button className="button--light">{props.value}</button>;
}
export default ButtonLight;
