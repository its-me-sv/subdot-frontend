import styled, {createGlobalStyle, css, keyframes} from "styled-components";

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${(props) => props.theme.backgroundColor};
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

.app-container {
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 1fr 14fr;
  overflow-x: hidden;
}

*::-webkit-scrollbar {
    -webkit-appearance: none;
}

/* width */
*::-webkit-scrollbar {
  width: 0.4rem;
}

/* Track */
*::-webkit-scrollbar-track {
  background-color: rgb(227, 224, 224);
  border-radius: 2px;
}
 
/* Handle */
*::-webkit-scrollbar-thumb {
  border-radius: 0.7rem;
  background-color: #797676;
}

/* Handle on hover */
*::-webkit-scrollbar-thumb:hover {
  opacity: 0;
}
`;

export const BoxShadow = css`
  box-shadow: 0 0 20px #e2e8f0;
  background-color: #ffffff;
`;

export const BoxShadowDark = css`
  box-shadow: 0 0 20px #595959;
  background-color: #222222;
`;

export const Button = styled.span<{bgColor: string; dark?: boolean; fixed?: boolean}>`
  font-family: Inter;
  color: #ffffff;
  ${BoxShadow}
  background-color: ${props => props.bgColor};
  padding: 0.42rem;
  border-radius: 0.36rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.84;
  }
  ${props => props.dark && `
    color: #222222;
  `}
  ${props => props.fixed && `
    position: absolute;
  `}
`;

export const HrLn = styled.div`
  height: 1px;
  width: 100%;
  align-self: center;
  border-bottom: 1px solid #222222;
  opacity: 0.84;
`;

export const FadeAnim = keyframes`
  0% {opacity: 0;}
  100% {opacity: 0.6;}
`;
