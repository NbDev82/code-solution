import React from 'react';
import './Button.scss';

function ButtonHightLight(props) {
  return (
    <button className={`button--hightlight ${props.className}`} onClick={() => props.onClick(props.id)}>
      {props.children}
    </button>
  );
}
export default ButtonHightLight;
