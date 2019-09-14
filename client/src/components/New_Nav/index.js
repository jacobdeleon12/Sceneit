import React from "react";
import "./style.css";
import { GLogout } from "../Buttons/Google";
import { GLogin } from "../Buttons/Google";
import { Link } from "react-router-dom";

const Logo = "<Scene/ IT>";

function Nav2() {
  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <Link className="navbar-brand" id="logo" to="/">
          {Logo}
        </Link>
      </div>
      <div className="nav-btn">
        <label for="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div class="nav-btns">
        <Link to="/main/user">Profile</Link>
        <GLogin />
        <a href="https://sceneitapp.herokuapp.com/">Logout</a>
      </div>
    </div>
  );
}

export default Nav2;
