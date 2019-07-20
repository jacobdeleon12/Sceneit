import React from "react";
import "./style.css";
import { GoogleLogout } from "react-google-login";

export function GLogout() {
  const logout = () => {
    console.log("logout"); // eslint-disable-line
  };
  return (
    <GoogleLogout
      client_Id="560748393507-rrhsc621nmf915rp2d99bk38vrgjjpir.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
      redirectUri="https://sceneitapp.herokuapp.com/"
    />
  );
}
