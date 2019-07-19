import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Main from "./pages/Main";
import NoMatch from "./pages/NoMatch";
<<<<<<< HEAD
// import Nav from "./components/Nav";
=======
import Nav from "./components/Nav";
import Login from "./pages/Login";
>>>>>>> master

function App() {
  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/books" component={Books} />
          <Route exact path="/books/:id" component={Main} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
