import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Users from "./pages/Users";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={Main} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
