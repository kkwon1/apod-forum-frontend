import React, { useEffect, useState, Fragment } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../main/Header";
import ApodItem from "../body/ApodItem";
import Divider from "@mui/material/Divider";
import CommentThread from "./CommentThread";
import { useMediaQuery } from "react-responsive";
import { useAuth0 } from "@auth0/auth0-react";
import AddComment from "./AddComment";

const ApodViewContainer = styled.div`
  font-family: "Poppins", sans-serif;
  padding-left: 400px;
  padding-right: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImageSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const DescriptionContainer = styled.div`
  padding-top: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #626262;

  padding-bottom: 30px;
`;

const ImageLinkContainer = styled.a`
  height: 600px;
`;
const ImageContainer = styled.img`
  height: 600px;
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

const ApodPost = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [apodPost, setApodPost] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const search = useLocation().search;
  const postId = new URLSearchParams(search).get("post_id");
  const serverEndpointBase = process.env.REACT_APP_APOD_BASE_ENDPOINT;

  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  useEffect(() => {
    fetch(`${serverEndpointBase}/post?post_id=${postId}`)
      .then((response) => response.json())
      .then((data) => setApodPost(data));
    getAccessTokenSilently().then((accessToken) => setAccessToken(accessToken));
  }, [postId, serverEndpointBase, getAccessTokenSilently]);

  if (apodPost) {
    return (
      <Fragment>
        {isDesktop && (
          <ApodViewContainer>
            <Header />
            <ApodItem apod={apodPost.nasaApod} />
            <ImageSectionContainer>
              <ImageLinkContainer href={apodPost.nasaApod.hdurl} target="blank">
                <ImageContainer
                  src={apodPost.nasaApod.hdurl}
                  alt="Alt Text"
                ></ImageContainer>
              </ImageLinkContainer>
            </ImageSectionContainer>
            <DescriptionContainer>
              {apodPost.nasaApod.explanation}
            </DescriptionContainer>
            <Divider variant="middle" />
            <AddComment
              isAuthenticated={isAuthenticated}
              comments={apodPost.comments}
              accessToken={accessToken}
              user={user}
              date={postId}
            />
          </ApodViewContainer>
        )}
        {isMobile && (
          <MobileApodViewContainer>
            <Header />
            <ApodItem apod={apodPost.nasaApod} />
            <ImageSectionContainer>
              <ImageLinkContainer href={apodPost.nasaApod.hdurl} target="blank">
                <ImageContainer
                  src={apodPost.nasaApod.hdurl}
                  alt="Alt Text"
                ></ImageContainer>
              </ImageLinkContainer>
            </ImageSectionContainer>
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
