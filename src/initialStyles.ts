import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const InitialStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR&display=swap');
  ${reset}
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }
  div, p, span, h1, h2, h3, h4, h5, ul, li, input, textarea {
    font-family: 'Noto Sans KR', sans-serif;
    letter-spacing: -0.5px;
  }
`;

export const color = {
  white: "#fafafa",
  green: "#00b894",
  yellow: "#fdcb6e",
  red: "#d63031",
  grey: "#b2bec3",
  black: "#252525"
}