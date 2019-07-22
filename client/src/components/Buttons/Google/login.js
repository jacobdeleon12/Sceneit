import React from "react";
import "./style.css";
import { GoogleLogout, GoogleLogin } from "react-google-login";
import API from "../../../utils/API";

const clientId =
  "560748393507-rrhsc621nmf915rp2d99bk38vrgjjpir.apps.googleusercontent.com";

const success = response => {
  console.log(response); // eslint-disable-line
  console.log(response.profileObj); // eslint-disable-line
  const profile = response.profileObj;
  const profId = profile.googleId;
  const profGiveName = profile.givenName;
  const profFamName = profile.familyName;
  const profImg = profile.imageUrl;
  const profEmail = profile.email;
  console.log(profId);
  console.log(profGiveName);
  console.log(profFamName);
  console.log(profImg);
  console.log(profEmail);
  document.cookie = profId;
  console.log(document.cookie);


  API.getUser(profId)
    .then(res => {
      console.log(res.data);
      if (res.data === null || res.data.googleId !== profId) {
        API.saveUser({
          googleId: profId,
          givenName: profGiveName,
          familyName: profFamName,
          email: profEmail,
          imageUrl: profImg
        })
          .then(res => {
            console.log("this happened")
            window.location.replace("/main");
            // window.location.replace("http://sceneitapp.herokuapp.com/main");
          })
          .catch(err => console.log(err))
      } else {
        console.log("already exists");
        window.location.replace("/main");
        // window.location.replace("https://sceneitapp.herokuapp.com/main");
      }
    })
    .catch(err => console.log(err));

  // API.getUsers()
  //   .then(res => console.log(res.data))
  //   .catch(err => console.log(err));

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
