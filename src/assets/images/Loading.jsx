import styled from "styled-components";

const Svg = styled.svg`
  width: 3rem;
  height: 3rem;
  z-index: 100;
  animation: spin 1s linear infinite;
  color: black;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => (
  <Svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 50 50">
    <path
      fill="currentColor"
      d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
    ></path>
  </Svg>
);

export default Loading;