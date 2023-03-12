import styled, {keyframes} from "styled-components";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: #ffffff;
  gap: 1.8rem;
  ${props => props.dark && `
    background-color: #222222;
  `}
`;

const animeString: string = new Array(11).fill(0).map(
    (_, idx) =>
      `${idx}0% {
        opacity:0.${idx};
        overflow: hidden; 
        max-width: ${idx}ch;
        white-space: nowrap;
      }`
  ).join("\n");

const showHide = keyframes`${animeString}`;

export const LogoText = styled.span`
  font-family: Freestyle;
  font-size: 12rem;
  height: 10rem;
  width: 100%;
  text-align: center;
  background: -webkit-linear-gradient(#18e9ea, #ec13e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${showHide} 2.1s ease-in-out infinite;
`;

export const CaptionText = styled.span<{dark: boolean;}>`
    font-family: Inter;
    text-align: center;
    font-size: 1.4rem;
    color: #222222;
    ${props => props.dark && `color: #ffffff;`}
`;
