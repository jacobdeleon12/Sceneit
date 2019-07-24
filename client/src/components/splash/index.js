import "./style.css"
import React from "react";


function background({children}) {
  return (
    <div className = "background">
      {children}
    </div>
  );
}

export default background;
