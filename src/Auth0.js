import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
    <Auth0Provider
        domain="dev-cm13j40gp0zob6vt.us.auth0.com"
        clientId="NI3dTZWJfmHxtVNkBBS9iSH1CHGqej3n"
        authorizationParams={{
        redirect_uri: window.location.origin
        }}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
    );