import React, { Fragment } from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const ImageSectionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const ImageLinkContainer = styled.a`
  height: 600px;
`;
const ImageContainer = styled.img`
  height: 600px;
`;

const MobileImageLinkContainer = styled.a`
  width: auto;
  max-width: 100%;
  height: auto;
`;
const MobileImageContainer = styled.img`
  width: auto;
  max-width: 100%;
  height: auto;
`;

const ImageSection = (props) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <Fragment>
      {isDesktop && (
        <ImageSectionContainer>
          <ImageLinkContainer href={props.hdurl} target="blank">
            <ImageContainer src={props.hdurl} alt="Alt Text"></ImageContainer>
          </ImageLinkContainer>
        </ImageSectionContainer>
      )}
      {isMobile && (
        <ImageSectionContainer>
          <MobileImageLinkContainer href={props.hdurl} target="blank">
            <MobileImageContainer
              src={props.hdurl}
              alt="Alt Text"
            ></MobileImageContainer>
          </MobileImageLinkContainer>
        </ImageSectionContainer>
      )}
    </Fragment>
  );
};

export default ImageSection;
