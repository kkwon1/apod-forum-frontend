import React from "react";
import styled from "styled-components";
import Body from "./Body";
import Header from "./Header";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Main = () => {
  return (
    <MainContainer>
      <Header />
      <Body />
    </MainContainer>
  );
};

export default Main;
