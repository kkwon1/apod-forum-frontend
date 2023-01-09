import React from "react";
import styled from "styled-components";

const CommentThreadContainer = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
`;

const CommentThread = (props) => {
  const topLevelComments = props.comments.children.map((comment) => (
    <li key={comment.commentId}>{comment.comment}</li>
  ));

  return <CommentThreadContainer>{topLevelComments}</CommentThreadContainer>;
};

export default CommentThread;
