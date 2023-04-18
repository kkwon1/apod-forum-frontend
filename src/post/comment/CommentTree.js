import React from "react";
import styled from "styled-components";

const CommentTreeContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const CommentContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const HeadingSection = styled.div`
  color: #acacac;
`;

const TextSection = styled.div`
  padding-top: 10px;
`;

const ReplySection = styled.div`
  font-size: 14px;
  padding-top: 10px;
  color: #acacac;
  text-decoration: underline;
  text-align: left;
`;

/**
 * A single Comment Tree where a top level comment is the root node.
 */
const CommentTree = (props) => {
  return (
    <CommentTreeContainer>
      {getCommentContainer(props.comment)}
    </CommentTreeContainer>
  );
};

const getCommentContainer = (comment) => {
  return (
    <CommentContainer>
      <HeadingSection>kevin kwon 10 hours ago | link</HeadingSection>
      <TextSection>{comment}</TextSection>
      <ReplySection>reply</ReplySection>
      {comment.children
        ? comment.children.map((child) => getCommentContainer(child))
        : ""}
    </CommentContainer>
  );
};

export default CommentTree;
