import React from "react";
import defaultStyles from "@styles/componentStyles.module.scss";
import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <div className={defaultStyles.menuDefault}>
      <Link to="/">Dashboard</Link>
      <Link to="login">Login</Link>
    </div>
  );
};

export default MenuBar;
