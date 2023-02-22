import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Body from "../body/Body";
import Header from "./Header";
import { useMediaQuery } from "react-responsive";
import Paginator from "./Paginator";
import { useAuth0 } from "@auth0/auth0-react";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 400px;
  margin-right: 400px;
`;

const Main = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();

  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }

  const DEFAULT_LIMIT = 30;
  let offset = (page - 1) * DEFAULT_LIMIT;

  const [apodData, setApodData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  const serverEndpointBase = process.env.REACT_APP_APOD_BASE_ENDPOINT;

  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  localStorage.setItem("postId", null);

  useEffect(() => {
    setIsFetching(true);
    fetch(`${serverEndpointBase}/apod?offset=${offset}&limit=${DEFAULT_LIMIT}`)
      .then((response) => response.json())
      .then((apodData) =>
        apodData.sort((a, b) => a.date.localeCompare(b.bdate))
      )
      .then((apodData) => setApodData(apodData))
      .then(() => setIsFetching(false));

    getAccessTokenSilently().then((accessToken) => {
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      if (user != null) {
        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userSub: user.sub,
          }),
        };

        fetch(serverEndpointBase + "/user", requestOptions)
          .then((response) => response.json())
          .then((user) =>
            localStorage.setItem("userUpvotes", user.upvotedPostIds)
          );
      }
    });
  }, [serverEndpointBase, offset, getAccessTokenSilently, user]);

  if (isFetching) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        {isDesktop && (
          <MainContainer>
            <Header
              user={user}
              accessToken={accessToken}
              isLoading={isLoading}
            />
            <Body apodData={apodData} />
            <Paginator page={page} />
          </MainContainer>
        )}
        {isMobile && (
          <Fragment>
            <Header
              user={user}
              accessToken={accessToken}
              isLoading={isLoading}
            />
            <Body apodData={apodData} />
            <Paginator page={page} />
          </Fragment>
        )}
      </Fragment>
    );
  }
};

export default Main;
