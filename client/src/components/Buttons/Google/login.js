import React from "react";
import "./style.css";
import GoogleLogin from "react-google-login";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function GLogin() {
    const responseGoogle = (response) => {
        console.log(response);
    }
    return (
        <GoogleLogin
            clientId="560748393507-rrhsc621nmf915rp2d99bk38vrgjjpir.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
};
