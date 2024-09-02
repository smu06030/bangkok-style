import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../assets/fonts/font.css";

const GlobalStyle = createGlobalStyle`
  ${reset}
  *, div, span, p, h1, h2, h3, h4, h5, h6{
    font-family: "Pretendard";
    word-break: keep-all;
  }

h2{
  font-size: 40px;
  display: flex;
  justify-content: center;
  margin:40px 0 30px;
}

section ol{
  display: flex;
  justify-content: center;
}

section ol li{
  width: 500px;
  height: 80px;
  font-size:18px;
  padding: 0 30px;
  display: flex;
  gap: 14px;
  letter-spacing: 1px;
}

section ol li button{
  width: 90px;
  display: flex;
  justify-content: center;
}
`;

export default GlobalStyle;
