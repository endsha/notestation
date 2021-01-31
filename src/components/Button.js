import React from "react";
import defaultStyles from "@styles/componentStyles.module.scss";

const Button = (props) => {
  const { children, style, className, onClick } = props;

  return (
    <button
      style={style}
      className={`${defaultStyles.buttonDefault} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
