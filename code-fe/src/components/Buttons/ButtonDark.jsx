import React from 'react';
import './Button.scss';

function ButtonDark(props) {
  return <button className={`button--dark ${props.className}`}>{props.children}</button>;
}
export default ButtonDark;
