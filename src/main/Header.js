import React from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";

const HeaderContainer = styled(Typography)`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
  font-family: "Poppins", sans-serif;
`;

const MainContainer = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-right: 25px;
`;

const NavigationContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <NavigationContainer>
        <MainContainer>APOD Forum</MainContainer>
        Popular | Comments | Search | Random
      </NavigationContainer>
      <LoginContainer>Login</LoginContainer>
    </HeaderContainer>
  );
};

export default Header;
