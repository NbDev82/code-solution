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
          [styles.small]: props.small,
          [styles.large]: props.large,
          [styles.textHighLight]: props.textHighLight,
        },
        defaultClasses,
      )}
      onClick={() => props.onClick(props.id)}
      style={{
        borderRadius: props.radius,
        color: props.color,
        fontSize: props.fontSize,
        backgroundColor: props.backgroundColor,
      }}
    >
      {props.children}
      { props.badge && <div className={styles.badge}>{props.badge}</div> }
    </button>
  );
}
export default Button;
