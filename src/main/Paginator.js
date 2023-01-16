import React, { Fragment } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PaginatorContainer = styled.div`
  display: flex;
  padding-top: 30px;
  padding-bottom: 30px;
  font-family: "Poppins", sans-serif;
`;

const PreviousPageButton = styled.div`
  cursor: pointer;
`;

const Separator = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;

const NextPageButton = styled.div`
  cursor: pointer;
`;

const Paginator = (props) => {
  let navigate = useNavigate();
  return (
    <PaginatorContainer>
      {props.page > 1 && (
        <Fragment>
          <PreviousPageButton
            onClick={() => previousPage(navigate, props.page)}
          >
            &lt;&lt; Page {parseInt(props.page) - 1}
          </PreviousPageButton>
          <Separator>|</Separator>
        </Fragment>
      )}
      <NextPageButton onClick={() => nextPage(navigate, props.page)}>
        Page {parseInt(props.page) + 1} &gt;&gt;
      </NextPageButton>
    </PaginatorContainer>
  );
};

let previousPage = (navigate, page) => {
  navigate("/page/" + (parseInt(page) - 1), { state: { apodData: null } });
};

let nextPage = (navigate, page) => {
  navigate("/page/" + (parseInt(page) + 1), { state: { apodData: null } });
};

export default Paginator;
