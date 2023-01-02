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

  useEffect(() => {
    fetch(
      "http://localhost:8082/apod?start_date=2022-08-01&end_date=2022-08-30"
    )
      .then((response) => response.json())
      .then((apodData) => setApodData(apodData));
  }, []);

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
