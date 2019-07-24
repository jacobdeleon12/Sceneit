// export * from "./MainNav";
// export * from "./EditUserNav";
// export * from "./SearchNav";
// export * from "./SearchResultNav";
// export * from "./TitleNav";
// export * from "./UserNav";
import "./style.css"

import React from "react";

const Logo = "<Scene/ IT>"

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <a className="navbar-brand" href="/">
        {Logo}
      </a>
    </nav>
  );
}

export default NavBar;
