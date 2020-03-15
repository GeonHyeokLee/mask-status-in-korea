import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const InitialStyle = createGlobalStyle`
  ${reset}
  div, p, span, h1, h2, h3, h4, h5, ul, li, input, textarea,button, form, b {
    box-sizing: border-box;
    border:none;
    padding: 0;
    margin:0;
    font-family: 'Noto Sans KR', Arial, -apple-system, Roboto, sans-serif;
    letter-spacing: -0.8px;
    -webkit-text-size-adjust: 100%;
    outline: none;
  }
`;
