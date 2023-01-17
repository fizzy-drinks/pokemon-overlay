import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'pogeys';
    src: url('/font/PKMN RBYGSC.ttf');
  }

  * {
    font-weight: normal;
    font-family: pogeys, sans-serif;
    text-rendering: optimizeSpeed;
    box-sizing: border-box;
  }

  body {
    background-color: black;
    color: white;
    font-size: 13px;
    line-height: 1.5em;
    margin: 0;
  }

  h1,
  h2,
  h3 {
    margin: 0 0 5px 0;
  }

  table {
    border: 1px solid white;
    padding: 5px;
  }

  td:not(:last-child) {
    white-space: nowrap;
  }
`;
