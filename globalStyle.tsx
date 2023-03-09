import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Bogle';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/Bogle/BOGLEREGULAR.OTF') format('opentype');
  }

  @font-face {
    font-family: 'Bogle';
    font-style: italic;
    font-weight: 400;
    src: url('/fonts/Bogle/BOGLEITALIC.OTF') format('opentype');
  }

  @font-face {
    font-family: 'Bogle';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/Bogle/BOGLEBOLD.OTF') format('opentype');
  }

  @font-face {
    font-family: 'Bogle';
    font-style: italic;
    font-weight: 700;
    src: url('/fonts/Bogle/BOGLEBOLDITALIC.OTF') format('opentype');
  }

  @font-face {
    font-family: 'Bogle';
    font-style: normal;
    font-weight: 900;
    src: url('/fonts/Bogle/BOGLEBLACK.OTF') format('opentype');
  }

  @font-face {
    font-family: 'Bogle';
    font-style: italic;
    font-weight: 900;
    src: url('/fonts/Bogle/BOGLEBLACKITALIC.OTF') format('opentype');
  }
  
  * {
    margin: 0;
    padding: 0;
    font-family: "Bogle", "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    list-style: none;
  }

  a,
  a:visited,
  a:hover,
  a:active {
    color: inherit;
    text-decoration: none;
  }

  button {
    border: 0;
    cursor: pointer;
  }

  :root {
    --WALMART-BLUE: #0071dc;
    --WALMART-BLUE-DARK: #004f9a;
    --WALMART-YALLOW: #ffc220;
  }

  .shadow-soft {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

export default GlobalStyle;
