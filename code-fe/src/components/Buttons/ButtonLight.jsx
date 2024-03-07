import React from 'react';
import './Button.scss';

function ButtonLight(props) {
  return (
    <button className={`button--light ${props.className}`} onClick={() => props.onClick(props.id)}>
      {props.children}
    </button>
  );
}
export default ButtonLight;
