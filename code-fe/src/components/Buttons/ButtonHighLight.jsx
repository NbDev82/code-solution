import React from 'react';
import './Button.scss';

function ButtonHightLight(props) {
  return <button className={`button--hightlight ${props.className}`}>{props.children}</button>;
}
export default ButtonHightLight;
