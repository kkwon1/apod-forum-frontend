import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Body from "../body/Body";
import Header from "./Header";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 400px;
  margin-right: 400px;
`;

const Main = () => {
  const [apodData, setApodData] = useState(null);
  const serverEndpointBase = process.env.REACT_APP_APOD_BASE_ENDPOINT;

  useEffect(() => {
    fetch(`${serverEndpointBase}/apod`)
      .then((response) => response.json())
      .then((apodData) =>
        apodData.sort((a, b) => a.date.localeCompare(b.bdate))
      )
      .then((apodData) => setApodData(apodData));
  }, [serverEndpointBase]);

  if (apodData) {
    return (
      <MainContainer>
        <Header />
        <Body apodData={apodData} />
      </MainContainer>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Main;
