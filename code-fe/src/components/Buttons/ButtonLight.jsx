import React from 'react';
import './Button.scss';

function ButtonLight(props) {
  return <button className={`button--light ${props.className}`}>{props.children}</button>;
}
export default ButtonLight;
