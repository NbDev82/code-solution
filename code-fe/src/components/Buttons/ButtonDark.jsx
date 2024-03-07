import React from 'react';
import './Button.scss';

function ButtonDark(props) {
  return (
    <button className={`button--dark ${props.className}`} onClick={() => props.onClick(props.id)}>
      {props.children}
    </button>
  );
}
export default ButtonDark;
