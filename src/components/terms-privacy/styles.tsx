import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div<{ dark: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  ${(props) =>
    props.dark &&
    `
    background-color: rgba(255, 255, 255, 0.5);
  `}
`;

export const Box = styled.div<{ dark: boolean }>`
  max-width: 42rem;
  max-height: 35rem;
  font-family: Inter;
  display: flex;
  flex-direction: column;
  border-radius: 0.14rem;
  padding: 0.4rem 0.7rem;
  ${BoxShadow};
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
  `}
`;

export const CloseIcon = styled.span<{ dark: boolean }>`
  cursor: pointer;
  align-self: flex-end;
  color: #222222;
  ${props => props.dark && `
    color: #ffffff;
  `}
`;

export const Title = styled.span<{ dark: boolean }>`
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.4rem;
    color: #222222;
    ${props => props.dark && `
      color: #ffffff;
    `}
`;

export const Content = styled.span<{ dark: boolean }>`
  margin-bottom: 1rem;
  max-height: 18rem;
  overflow-y: auto;
  color: #222222;
  ${props => props.dark && `
    color: #ffffff;
  `}
`;
