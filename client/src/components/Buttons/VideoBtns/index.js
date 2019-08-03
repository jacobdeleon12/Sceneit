import React from "react";
import "./style.css";
import { useAlert } from "react-alert";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DeleteBtn(props) {
  const alert = useAlert();
  return (
    <button
      className="vidBtn delete-btn"
      {...props}
      tabIndex="0"
      onMouseUp={() => {
        alert.error("Deleted Video");
      }}
    >
      Delete
    </button>
  );
}

export function SaveBtn(props) {
  const alert = useAlert();
  return (
    <button
      className="vidBtn save-btn"
      {...props}
      tabIndex="0"
      onMouseUp={() => {
        alert.success("Saved Video");
      }}
    >
      Save
    </button>
  );
}
