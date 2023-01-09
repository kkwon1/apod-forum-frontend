import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{ cursor: "pointer" }} onClick={() => loginWithRedirect()}>
      Login
    </div>
  );
};

export default LoginButton;
