import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ApodItem from "../body/ApodItem";
import Divider from "@mui/material/Divider";

const ApodViewContainer = styled.div`
  font-family: "Poppins", sans-serif;
  padding-top: 40px;
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

const ImageContainer = styled.img`
  width: 100%;
`;

const CommentsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const CommentText = styled.textarea`
  width: 1200px;
`;

const ApodPost = () => {
  const [apodPost, setApodPost] = useState(null);
  const search = useLocation().search;
  const postId = new URLSearchParams(search).get("post_id");

  useEffect(() => {
    fetch("http://localhost:8082/post?post_id=" + postId)
      .then((response) => response.json())
      .then((data) => setApodPost(data));
  }, [postId]);

  if (apodPost) {
    return (
      <ApodViewContainer>
        <ApodItem apod={apodPost.nasaApod} />
        <ImageSectionContainer>
          <ImageContainer
            src={apodPost.nasaApod.hdurl}
            alt="Alt Text"
          ></ImageContainer>
        </ImageSectionContainer>
        <DescriptionContainer>
          {apodPost.nasaApod.description}
        </DescriptionContainer>

        <Divider variant="middle" />

        <CommentsContainer>
          <CommentText></CommentText>
          {JSON.stringify(apodPost.comments)}
        </CommentsContainer>
      </ApodViewContainer>
    );
  } else {
    return <div>Retrieving...</div>;
  }
};

export default ApodPost;
