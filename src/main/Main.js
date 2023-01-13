import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Body from "../body/Body";
import Header from "./Header";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "../mobile/MobileHeader";
import MobileBody from "../mobile/MobileBody";

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

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

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
      <Fragment>
        {isDesktopOrLaptop && (
          <MainContainer>
            <Header />
            <Body apodData={apodData} />
          </MainContainer>
        )}
        {isTabletOrMobile && (
          <Fragment>
            <MobileHeader />
            <MobileBody apodData={apodData} />
          </Fragment>
        )}
      </Fragment>
    );
  } else {
    return <div>loading...</div>;
  }
};

export default Main;
