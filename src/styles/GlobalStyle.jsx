import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../assets/fonts/font.css";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    font-family: "Pretendard";
  }
`;

export default GlobalStyle;
