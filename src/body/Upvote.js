import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiTriangle } from "@mdi/js";
import { useAuth0 } from "@auth0/auth0-react";

const UpvoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
`;

const UpvoteCountContainer = styled.div`
  display: flex;
  justify-content: center;
  color: #b4b4b4;
`;

const UpvoteIcon = styled(Icon)`
  color: #b4b4b4;
  &:hover {
    color: #c30e0e;
    cursor: pointer;
  }
`;

const Upvote = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <UpvoteContainer>
      <UpvoteIcon
        onClick={() => upvote(isAuthenticated, loginWithRedirect)}
        path={mdiTriangle}
        size={0.8}
      />
      <UpvoteCountContainer>0</UpvoteCountContainer>
    </UpvoteContainer>
  );
};

const upvote = (isAuthenticated, loginWithRedirect) => {
  if (isAuthenticated) {
    // TODO: Upvote
  } else {
    loginWithRedirect();
  }
};

export default Upvote;
