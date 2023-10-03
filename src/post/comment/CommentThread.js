import React from "react";
import styled from "styled-components";
import CommentTree from "./CommentTree";

const CommentThreadContainer = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
`;

const CommentThread = (props) => {
  if (props.comments) {
    const topLevelComments = props.comments.map((comment) => (
      <CommentTree
        key={comment.commentId}
        comment={comment.comment}
      ></CommentTree>
    ));

    return <CommentThreadContainer>{topLevelComments}</CommentThreadContainer>;
  } else {
    <div></div>;
  }
};

// For each comment, render the entire tree from root node
// Loop over each comment

export default CommentThread;
