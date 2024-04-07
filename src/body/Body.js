import React from "react";
import styled from "styled-components";
import ApodItem from "./ApodItem";

const ItemContainer = styled.div`
  list-style-type: none;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const Body = (props) => {
  if (props.apodData == null) {
    return <div></div>;
  } else {
    const apodItems = props.apodData.map((apod) => (
      <li key={apod.date}>
        <ApodItem apod={apod} showThumbnail={true}>
          {apod.title} - {apod.date}
        </ApodItem>
      </li>
    ));
    return <ItemContainer>{apodItems}</ItemContainer>;
  }
};

export default Body;
