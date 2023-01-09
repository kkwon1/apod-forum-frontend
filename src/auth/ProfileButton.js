import React from "react";

const ProfileButton = (props) => {
  const profileStyle = {
    cursor: "pointer",
    marginRight: "20px",
  };
  return (
    <div
      onClick={() => {
        console.log(props.user);
      }}
      style={profileStyle}
    >
      Profile
    </div>
  );
};

export default ProfileButton;
