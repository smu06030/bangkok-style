import React from "react";
import styled from "styled-components";

const Svg = styled.svg`
  padding: 6px;
  cursor: pointer;
  
  &:hover {
    border-radius: 100%;
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const Search = ({ width, height }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M31 28H29.42L28.86 27.46C30.82 25.18 32 22.22 32 19C32 11.82 26.18 6 19 6C11.82 6 6 11.82 6 19C6 26.18 11.82 32 19 32C22.22 32 25.18 30.82 27.46 28.86L28 29.42V31L38 40.98L40.98 38L31 28ZM19 28C14.02 28 10 23.98 10 19C10 14.02 14.02 10 19 10C23.98 10 28 14.02 28 19C28 23.98 23.98 28 19 28Z"
        fill="#656F79"
      />
    </Svg>
  );
};

export default Search;
