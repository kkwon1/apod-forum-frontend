import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../main/Header";
import Body from "../body/Body";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./SearchBar";

const PageContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 400px;
  margin-right: 400px;
`;

// TODO: Paginate the search results
const SearchPage = () => {
  const serverEndpointBase = process.env.REACT_APP_APOD_BASE_ENDPOINT;
  const [apodData, setApodData] = useState([]);

  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);

  // const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  // const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
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

    const searchApod = (searchText) => {
      fetch(serverEndpointBase + `/apods/search?searchString=${searchText}`)
        .then((response) => response.json())
        .then((apodList) => {
          setApodData(apodList);
        });
    };

    const searchParams = new URLSearchParams(window.location.search);
    const searchText = searchParams.get("q");
    searchApod(searchText);
  }, [getAccessTokenSilently, user, serverEndpointBase]);

  return (
    <Fragment>
      <PageContainer>
        <SearchContainer>
          <Header user={user} accessToken={accessToken} isLoading={isLoading} />
          <SearchBar />
          <Body apodData={apodData} />
        </SearchContainer>
      </PageContainer>
    </Fragment>
  );
};

export default SearchPage;
