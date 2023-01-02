import React from "react";
import styled from "styled-components";
import Icon from "@mdi/react";
import { mdiTriangle } from "@mdi/js";

const ApodItemContainer = styled.div`
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: row;
`;

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

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 1px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-right: 10px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TitleContainer = styled.div`
  font-size: 20px;
  color: blue;
  font-weight: bold;
`;

const InfoContainer = styled.div`
  color: #919191;
`;

const ApodItem = (props) => {
  return (
    <ApodItemContainer>
      <UpvoteContainer>
        <Icon path={mdiTriangle} size={0.8} color="#b4b4b4" />
        <UpvoteCountContainer>0</UpvoteCountContainer>
      </UpvoteContainer>
      <ThumbnailContainer>
        <Thumbnail src={props.apod.url} alt={props.apod.title} />
      </ThumbnailContainer>
      <ContentContainer>
        <TitleContainer>{props.apod.title}</TitleContainer>
        <InfoContainer>
          {props.apod.date} | 0 comments{" "}
          {props.apod.copyright ? `| ${props.apod.copyright}` : null}
        </InfoContainer>
      </ContentContainer>
    </ApodItemContainer>
  );
};

export default ApodItem;
