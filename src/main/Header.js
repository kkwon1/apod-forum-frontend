import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import LoginButton from "../auth/LoginButton";
import LogoutButton from "../auth/LogoutButton";
import ProfileButton from "../auth/ProfileButton";
import { useMediaQuery } from "react-responsive";
import { useAuth0 } from "@auth0/auth0-react";

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

const AuthContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MobileHeaderContainer = styled(Typography)`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  font-family: "Poppins", sans-serif;
`;

const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  if (!isLoading) {
    return (
      <Fragment>
        {isDesktop && (
          <HeaderContainer component="span">
            <NavigationContainer>
              <MainContainer onClick={() => navigate("/")}>
                <div style={{ cursor: "pointer" }}>APOD Forum</div>
              </MainContainer>
              Popular | Comments | Search | Random
            </NavigationContainer>
            {isAuthenticated && !isLoading ? (
              <AuthContainer>
                <ProfileButton user={user} />
                <LogoutButton />
              </AuthContainer>
            ) : (
              <LoginButton />
            )}
          </HeaderContainer>
        )}
        {isMobile && (
          <MobileHeaderContainer component="span">
            <NavigationContainer>
              <MainContainer onClick={() => navigate("/")}>
                <div style={{ cursor: "pointer" }}>APOD Forum</div>
              </MainContainer>
            </NavigationContainer>
            {isAuthenticated ? (
              <AuthContainer>
                <ProfileButton user={user} />
                <LogoutButton />
              </AuthContainer>
            ) : (
              <LoginButton />
            )}
          </MobileHeaderContainer>
        )}
      </Fragment>
    );
  } else {
    return (
      <HeaderContainer>
        <NavigationContainer>
          <MainContainer onClick={() => navigate("/")}>
            <div style={{ cursor: "pointer" }}>APOD Forum</div>
          </MainContainer>
          Popular | Comments | Search | Random
        </NavigationContainer>
      </HeaderContainer>
    );
  }
};

export default Header;
