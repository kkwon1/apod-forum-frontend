import React from "react";
import styled from "styled-components";
import MobileApodItem from "./MobileApodItem";

const ItemContainer = styled.div`
  list-style-type: none;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const MobileBody = (props) => {
  const apodItems = props.apodData.map((apod) => (
    <li key={apod.date}>
      <MobileApodItem apod={apod} showThumbnail={true}>
        {apod.title} - {apod.date}
      </MobileApodItem>
    </li>
  ));
  return <ItemContainer>{apodItems}</ItemContainer>;
};

export default MobileBody;
