import React from "react";
import "./style.css";
import { GLogout } from "../Buttons/Google";
import { Link } from "react-router-dom";

const Logo = "<Scene/ IT>";

export function LoginNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <Link className="navbar-brand" to="/">
        {Logo}
      </Link>
    </nav>
  );
}

export function MainNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <Link className="navbar-brand" id="logo" to="/">
        {Logo}
      </Link>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end text-center"
        id="navbarNav"
      >
        <ul className="navbar-nav mr-3">
          <li className="nav-item">
            <Link className="nav-link" to="/main">
              Home
            </Link>
          </li>
          <li className="nav-item mr-1">
            <Link className="nav-link" to="/main/user">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <GLogout />
          </li>
        </ul>
        <form
          className="form-inline my-2 my-lg-0"
          style={{ display: "block" }}
          action="/main/search"
          method="GET"
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Videos"
            name="q"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0 vidSearch"
            type="submit"
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </nav>
  );
}
