// export * from "./MainNav";
// export * from "./EditUserNav";
// export * from "./SearchNav";
// export * from "./SearchResultNav";
// export * from "./TitleNav";
// export * from "./UserNav";
import "./style.css"

import React from "react";
const name = "<SceneIT/>"
function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        {name}
      </a>
    </nav>
  );
}

export default NavBar;
