import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../assets/fonts/font.css";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
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
