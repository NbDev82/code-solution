import clsx from 'clsx';
import styles from './Button.module.scss';
import React from 'react';

function Button(props) {
  const defaultClasses = props.className;
  return (
    <button
      className={clsx(
        styles.default,
        {
          [styles.light]: props.light,
          [styles.dark]: props.dark,
          [styles.highlight]: props.highlight,
          [styles.icon]: props.icon,
          [styles.disable]: props.disable,
          [styles.gray]: props.gray,
        },
        defaultClasses,
      )}
      onClick={() => props.onClick(props.id)}
    >
      {props.children}
    </button>
  );
}
export default Button;
