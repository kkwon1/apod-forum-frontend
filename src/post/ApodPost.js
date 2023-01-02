import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import ApodItem from "../body/ApodItem";

const ApodViewContainer = styled.div`
  font-family: "Poppins", sans-serif;
  padding-top: 40px;
  margin-left: 400px;
  margin-right: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InteractionContainer = styled(Paper)`
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 50px;
  padding-right: 50px;
  width: 1200px;
  margin: auto;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DescriptionContainer = styled.div`
  padding-top: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #626262;

  padding-bottom: 20px;
`;

const ImageContainer = styled.img`
  display: flex;
  justify-content: center;
  width: 750px;
`;

const CommentsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
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
        <DescriptionContainer>
          {apodPost.nasaApod.description}
        </DescriptionContainer>
        <ImageContainer
          src={apodPost.nasaApod.hdurl}
          alt="Alt Text"
        ></ImageContainer>
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
