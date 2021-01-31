import React from "react";
import defaultStyles from "@styles/componentStyles.module.scss";

const Input = (props) => {
  const {
    style,
    className,
    onChange,
    value,
    placeholder,
    disabled,
    type,
  } = props;

  return (
    <input
      style={style}
      className={`${defaultStyles.inputDefault} ${className}`}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      type={type}
    />
  );
};

export default Input;
