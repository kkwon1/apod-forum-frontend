import React, { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../main/Header";
import ApodItem from "../body/ApodItem";
import { useMediaQuery } from "react-responsive";
import { useAuth0 } from "@auth0/auth0-react";
import ImageSection from "./Image";

const ApodViewContainer = styled.div`
  font-family: "Poppins", sans-serif;
  padding-left: 400px;
  padding-right: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DescriptionContainer = styled.div`
  padding-top: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #626262;

  padding-bottom: 60px;
`;

const MobileApodViewContainer = styled.div`
  font-family: "Poppins", sans-serif;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MobileDescriptionContainer = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #626262;
  text-align: left;
  padding: 15px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  padding-top: 10px;
`;

const Tag = styled.div`
  display: inline-block;
  margin: 5px;
  padding: 5px;
  border-radius: 5px;
  background-color: #e0e0dc;
`;

const ApodPost = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const [apodPost, setApodPost] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const search = useLocation().search;
  const postId = new URLSearchParams(search).get("post_id");
  const serverEndpointBase = process.env.REACT_APP_APOD_BASE_ENDPOINT;

  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  localStorage.setItem("postId", postId);

  useEffect(() => {
    fetch(`${serverEndpointBase}/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setApodPost(data));
    getAccessTokenSilently().then((accessToken) => {
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken);
    });
  }, [postId, serverEndpointBase, getAccessTokenSilently]);

  if (apodPost) {
    return (
      <Fragment>
        {isDesktop && (
          <ApodViewContainer>
            <Header
              user={user}
              accessToken={accessToken}
              isLoading={isLoading}
            />
            <ApodItem apod={apodPost.nasaApod} />
            <ImageSection hdurl={apodPost.nasaApod.hdurl} />
            <TagContainer>
              {apodPost.nasaApod.tags.map((tag, index) => {
                const capitalizedTag = tag
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
                return <Tag key={index}>#{capitalizedTag}</Tag>;
              })}
            </TagContainer>
            <DescriptionContainer>
              {apodPost.nasaApod.explanation}
            </DescriptionContainer>
            {/* <Divider variant="middle" /> */}
            {/* TODO add comment once ready */}
            {/* <AddComment
              isAuthenticated={isAuthenticated}
              comments={apodPost.comments}
              accessToken={accessToken}
              user={user}
              date={postId}
            /> */}
          </ApodViewContainer>
        )}
        {isMobile && (
          <MobileApodViewContainer>
            <Header
              user={user}
              accessToken={accessToken}
              isLoading={isLoading}
            />
            <ApodItem apod={apodPost.nasaApod} />
            <ImageSection hdurl={apodPost.nasaApod.hdurl} />
            <MobileDescriptionContainer>
              {apodPost.nasaApod.explanation}
            </MobileDescriptionContainer>
          </MobileApodViewContainer>
        )}
      </Fragment>
    );
  } else {
    return <div>Retrieving...</div>;
  }
};

export default ApodPost;
