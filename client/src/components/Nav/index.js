// export * from "./MainNav";
// export * from "./EditUserNav";
// export * from "./SearchNav";
// export * from "./SearchResultNav";
// export * from "./TitleNav";
// export * from "./UserNav";

import React from "react";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <a className="navbar-brand" href="/">
        SceneIT
      </a>
    </nav>
  );
}

export default NavBar;
