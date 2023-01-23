import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackRoute = () => {
  const navigate = useNavigate();

  const postId = localStorage.getItem("postId");

  const navigationRoute = postId === "null" ? "/" : "/post?post_id=" + postId;

  useEffect(() => {
    navigate(navigationRoute);
  });
  return <div></div>;
};

export default CallbackRoute;
