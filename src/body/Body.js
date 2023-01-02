import React from "react";
import styled from "styled-components";
import ApodItem from "./ApodItem";

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px;
  background-color: #3f3f3f;
`;

const ItemContainer = styled.ul`
  list-style-type: none;
`;

const Body = (props) => {
  const apodItems = props.apodData.map((apod) => (
    <li key={apod.date}>
      <ApodItem apod={apod}>
        {apod.title} - {apod.date}
      </ApodItem>
    </li>
  ));
  return <ItemContainer>{apodItems}</ItemContainer>;
};

export default Body;
