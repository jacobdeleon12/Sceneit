import React from "react";
import "./style.css";
import { GoogleLogout } from "react-google-login";

export function GLogout() {
    return (
        <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={logout}
        >
        </GoogleLogout>
    );
};