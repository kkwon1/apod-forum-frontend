import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Body from "../body/Body";
import Header from "./Header";
import { useMediaQuery } from "react-responsive";
import MobileHeader from "../mobile/MobileHeader";
import MobileBody from "../mobile/MobileBody";
import Paginator from "./Paginator";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 400px;
  margin-right: 400px;
`;

const Main = () => {
  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }

  const DEFAULT_LIMIT = 30;
  let offset = (page - 1) * DEFAULT_LIMIT;

  const [apodData, setApodData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const serverEndpointBase = process.env.REACT_APP_APOD_BASE_ENDPOINT;

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    setIsLoading(true);
    fetch(`${serverEndpointBase}/apod?offset=${offset}&limit=${DEFAULT_LIMIT}`)
      .then((response) => response.json())
      .then((apodData) =>
        apodData.sort((a, b) => a.date.localeCompare(b.bdate))
      )
      .then((apodData) => setApodData(apodData))
      .then(() => setIsLoading(false));
  }, [serverEndpointBase, offset]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        {isDesktopOrLaptop && (
          <MainContainer>
            <Header />
            <Body apodData={apodData} />
            <Paginator page={page} />
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
  }
};

export default Main;
