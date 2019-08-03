import React from "react";
import "./style.css";


function Alert(props) {
  return (
    <div
      role="alert"
      className={`${props.fade} alert alert-${props.type}`}
      style={{ width: "100%", margin: "20 auto", marginTop: 10, opacity:0 }}
    >
      {props.children}
    </div>
  );
}

export default Alert;