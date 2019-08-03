import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Search from "./pages/SearchResults";
import NoMatch from "./pages/NoMatch";
import SearchResults from "./pages/SearchResults";
import User from "./pages/User";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
// import EditUser from "./pages/EditUser";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/main/search" component={Search} />
          <Route exact path="/main/search/results" component={SearchResults} />
          <Route exact path="/main/user" component={User} />
          <Route exact path="/AboutUs" component={AboutUs} />
          <Route exact path="/ContactUs" component={ContactUs} />
          {/* <Route exact path="/main/user/:id" component={EditUser} /> */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
