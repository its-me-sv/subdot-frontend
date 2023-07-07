import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const BackgrorundHider = styled.div<{ dark: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  ${(props) =>
    props.dark &&
    `
    background-color: rgba(255, 255, 255, 0.5);
  `}
`;

export const Container = styled.div<{dark: boolean;}>`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 16rem;
    right: 0px;
    gap: 1rem;
    height: 100vh;
    padding-top: 1rem;
    border-bottom-left-radius: 0.42rem;
    a {
      text-decoration: none;
    }
    ${BoxShadow}
    ${props => props.dark && `
      ${BoxShadowDark}
    `}
`;

export const MenuItem = styled.div<{ dark: boolean }>`
  font-family: Inter;
  font-size: 1.4rem;
  opacity: 0.9;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 15rem;
  height: 2.1rem;
  gap: 1rem;
  img {
    width: 1.4rem;
    height: 1.4rem;
    opacity: 0.84;
    &:first-child {
      ${(props) =>
        props.dark &&
        `
        filter: invert(100%);
      `}
    }
    &:last-child {
      width: 2.1rem;
      height: 2.1rem;
      opacity: 1;
    }
  }
  &:hover {
    span {
      opacity: 0.5;
    }
    img {
      transform: scale(1.4);
      opacity: 0.5;
      &:last-child {
        transform: scale(1);
      }
    }
  }
  color: #222222;
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
  `}
`;
