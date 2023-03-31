import React, { useEffect, useState } from "react";
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

//TODO: Implement the following functionality
// Keep upvote highlighted if user has already upvoted
// Remove upvote if highlighted is clicked
const Upvote = (props) => {
  const [upvotedPost, setUpvotedPost] = useState(false);
  const [upvoteColor, setUpvoteColor] = useState("#b4b4b4");

  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const serverEndpointBase = process.env.REACT_APP_APOD_BASE_ENDPOINT;

  // So there are 3 possibilities
  // Unauthenticated - trigger login
  // Authenticated and did not upvote - upvote
  // Authenticated and upvoted - remove upvote
  const upvote = () => {
    if (isAuthenticated) {
      let accessToken = localStorage.getItem("accessToken");

      if (upvotedPost) {
        console.log("remove upvote");
      } else {
        if (accessToken != null && user != null) {
          const requestOptions = {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              postId: props.apod.date,
              userSub: user.sub,
            }),
          };

          fetch(serverEndpointBase + "/post/upvote", requestOptions)
            .then((response) => response.json())
            .then((response) => console.log(response));
        } else {
          loginWithRedirect();
        }
      }
    } else {
      loginWithRedirect();
    }
  };

  useEffect(() => {
    let userUpvotes = localStorage.getItem("userUpvotes");
    if (userUpvotes != null) {
      if (userUpvotes.includes(props.apod.date)) {
        setUpvoteColor("#c30e0e");
        setUpvotedPost(true);
      } else {
        setUpvoteColor("#b4b4b4");
        setUpvotedPost(false);
      }
    }
  }, [props.apod.date]);

  return (
    <UpvoteContainer>
      <UpvoteIcon
        style={{ color: upvoteColor }}
        onClick={() => upvote()}
        path={mdiTriangle}
        size={0.8}
      />
      <UpvoteCountContainer>{props.apod.likeCount}</UpvoteCountContainer>
    </UpvoteContainer>
  );
};

export default Upvote;
