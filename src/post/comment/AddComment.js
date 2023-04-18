import React, { useState, Fragment } from "react";
import styled from "styled-components";
import CommentThread from "./CommentThread";

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
  const [comments, setComments] = useState(props.comments.children);

  const addComment = () => {
    const serverEndpointBase = process.env.REACT_APP_APOD_BASE_ENDPOINT;
    let commentText = document.getElementById("commentText").value;
    document.getElementById("commentText").value = "";

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + props.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parentCommentId: props.date,
        comment: commentText,
        author: props.user.nickname,
        postId: props.date,
      }),
    };

    fetch(serverEndpointBase + "/comment/add", requestOptions)
      .then((response) => response.json())
      .then((comment) => {
        setComments([...comments, comment]);
      });
  };

  return (
    <Fragment>
      {props.isAuthenticated ? (
        <CommentsContainer>
          <CommentText id="commentText"></CommentText>
          <AddCommentButton onClick={addComment}>Add Comment</AddCommentButton>
          <CommentThread comments={comments} />
          {/* <Test comments={comments}></Test> */}
          {/* {JSON.stringify(comments)} */}
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
        </CommentsContainer>
      )}
    </Fragment>
  );
};

export default AddComment;
