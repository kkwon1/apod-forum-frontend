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

const TitleContainer = styled.a`
  font-size: 16px;
  color: blue;
  font-weight: bold;
  text-decoration: none;
  padding-right: 5px;
`;

const InfoContainer = styled.div`
  color: #919191;
  font-size: 14px;
`;

const CommentsSection = styled.a`
  text-decoration: none;
  color: #919191;
`;

const MobileApodItem = (props) => {
  let thumbnail;
  if (props.showThumbnail) {
    thumbnail = <Thumbnail src={props.apod.url} alt={props.apod.title} />;
  } else {
    thumbnail = <div />;
  }
  return (
    <ApodItemContainer>
      <UpvoteContainer>
        <Icon path={mdiTriangle} size={0.8} color="#b4b4b4" />
        <UpvoteCountContainer>0</UpvoteCountContainer>
      </UpvoteContainer>
      <ThumbnailContainer>{thumbnail}</ThumbnailContainer>
      <ContentContainer>
        <TitleContainer
          href={`https://apod.nasa.gov/apod/${buildUrlSuffix(
            props.apod.date
          )}.html`}
          target="blank"
        >
          {props.apod.title}
        </TitleContainer>
        <InfoContainer>
          {props.apod.date} |
          <CommentsSection
            href={`post?post_id=${props.apod.date}`}
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            {props.apod.commentCount} comments{" "}
          </CommentsSection>
          {props.apod.copyright ? `| ${props.apod.copyright}` : null}
        </InfoContainer>
      </ContentContainer>
    </ApodItemContainer>
  );
};

// Take an input date format of 2022-01-31 (yyyy-mm-dd) into apyymmdd
const buildUrlSuffix = (isoDate) => {
  let dateElements = isoDate.split("-");
  let year = dateElements[0].substring(2);
  let month = dateElements[1];
  let day = dateElements[2];

  return "ap" + year + month + day;
};

export default MobileApodItem;
