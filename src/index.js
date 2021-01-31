import React from "react";
import ReactDOM from "react-dom";
import "./index.module.scss";
import AppRouter from "./pages/router";

const App = () => <AppRouter />;

ReactDOM.render(<App />, document.getElementById("root"));
