import React, { useState, Fragment } from "react";
import styled from "styled-components";

const CommentsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const CommentText = styled.textarea`
  font-family: "Poppins", sans-serif;
  width: 800px;
  resize: vertical;
  height: 100px;
`;

const AddCommentButton = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100px;
`;

const AddComment = (props) => {
  return (
    <Fragment>
      {props.isAuthenticated ? (
        <CommentsContainer>
          <CommentText id="commentText"></CommentText>
          <AddCommentButton onClick={() => addComment(props)}>
            Add Comment
          </AddCommentButton>
          {JSON.stringify(props.comments)}
        </CommentsContainer>
      ) : (
        <CommentsContainer>
          <CommentText
            style={{
              color: "#acacac",
            }}
            disabled
            placeholder="You must be logged in to leave a comment."
          ></CommentText>
          {JSON.stringify(props.comments)}
        </CommentsContainer>
      )}
    </Fragment>
  );
};

const addComment = (props) => {
  const serverEndpointBase = process.env.REACT_APP_APOD_BASE_ENDPOINT;
  let comment = document.getElementById("commentText").value;

  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + props.accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentCommentId: props.date,
      comment: comment,
      author: props.user.nickname,
    }),
  };

  fetch(serverEndpointBase + "/comment/add", requestOptions).then((commentId) =>
    console.log(commentId)
  );
};

export default AddComment;
