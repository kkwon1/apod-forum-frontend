import React, { useState } from "react";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const StackContainer = styled(Stack)`
  width: 900px;
`;

const SearchBarContainer = styled(Paper)`
  display: flex;
  justify-content: space-between;
`;

const SearchTextContainer = styled(InputBase)`
  width: 800px;
  padding-left: 15px;
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    window.location.href = `/search?q=${query}`;
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <StackContainer spacing={2}>
      <SearchBarContainer component="form" label="search">
        <SearchTextContainer
          id="searchBar"
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
          placeholder='Search "galaxy" or "nebula"'
        />
        <IconButton
          onClick={handleSearch}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </SearchBarContainer>
    </StackContainer>
  );
};

export default SearchBar;
