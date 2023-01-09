import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const TypographyContainer = styled(Typography)`
  padding-left: 250px;
  font-family: "Poppins", sans-serif;
  color: #000000;
`;

const LoginContainer = styled(Typography)`
  padding-right: 250px;
  font-family: "Poppins", sans-serif;
  color: #000000;
`;

const NavBar = () => {
  return (
    <AppBar position="static" style={{ background: "#ffffff" }}>
      <Toolbar>
        <TypographyContainer variant="h6" component="span" sx={{ flexGrow: 1 }}>
          APOD Forum
        </TypographyContainer>
        <LoginContainer>Login</LoginContainer>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
