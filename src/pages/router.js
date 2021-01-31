import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import { MenuBar } from "@components";

// Pages
import Login from "./Login";
import Dashboard from "./Dashboard";

const AppRouter = () => {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <MenuBar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
