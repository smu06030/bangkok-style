import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../assets/fonts/font.css";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, div, span, p, h1, h2, h3, h4, h5, h6{
    font-family: "Pretendard";
  }

h2{
  font-size: 40px;
  display: flex;
  justify-content: center;
  margin:40px 0 30px;
}
`;

export default GlobalStyle;
