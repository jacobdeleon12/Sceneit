import React from "react";
import { Link } from "react-router-dom"


const Logo = "<Scene/ IT>"

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <Link className="navbar-brand" to="/">
        {Logo}
      </Link>
    </nav>
  );
}

export default NavBar;
