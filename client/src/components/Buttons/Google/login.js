import "./style.css";
import API from "../../../utils/API";
import React from "react";
import { GoogleLogout, GoogleLogin } from "react-google-login";

const clientId =
  "560748393507-rrhsc621nmf915rp2d99bk38vrgjjpir.apps.googleusercontent.com";

const success = response => {
  // console.log(response); // eslint-disable-line
  // console.log(response.profileObj); // eslint-disable-line
  
  const profId = response.profileObj.googleId;

  API.getUser(profId)
    .then(res => {
      console.log(res.data);
      if (res.data === null || res.data.googleId !== profId) {
        API.saveUser(response.profileObj)
          .then(res => {
            console.log("New user, info added to DB")
            window.location.replace("/main");
          })
          .catch(err => console.log(err))
      } else {
        console.log("User already exists, info not added to DB");
        window.location.replace("/main");
      }
    })
    .catch(err => console.log(err));

  API.getUsers()
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

};

const error = () => {
  console.error("error"); // eslint-disable-line
};

// const loading = () => {
//   console.log("loading"); // eslint-disable-line
//   window.location.replace("https://sceneitapp.herokuapp.com/");
// };

const logout = () => {
  console.log("logout"); // eslint-disable-line
  window.location.replace("https://sceneitapp.herokuapp.com/");
};

export function GLogin() {
  return (
    // <GoogleLogin
    //   client_Id={clientId}
    //   // clientId={clientId}
    //   buttonText="Login"
    //   className="Gbutton"
    //   onRequest={loading}
    //   onSuccess={success}
    //   onFailure={error}
    //   cookiePolicy={"single_host_origin"}
    //   // isSignedIn
    //   // uxMode="redirect"
    //   redirectUri="https://sceneitapp.herokuapp.com/auth/google/callback"
    // />
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={success}
      onFailure={error}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export function GLogout() {
  return (
    <GoogleLogout
      client_Id={clientId}
      buttonText="Logout"
      onLogoutSuccess={logout}
      redirectUri="https://sceneitapp.herokuapp.com/"
    />
  );
}
