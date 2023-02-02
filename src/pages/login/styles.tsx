import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div<{ dark: boolean }>`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f5f4f9;
  ${(props) =>
    props.dark &&
    `
    background-color: #1a1a1a;
  `}
`;

export const LoginForm = styled.div<{ dark: boolean }>`
  width: 36rem;
  height: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.14rem;
  gap: 1.8rem;
  ${BoxShadow}
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
  `}
`;

export const Title = styled.span`
  font-family: Freestyle;
  font-size: 12rem;
  width: 100%;
  height: 10rem;
  text-align: center;
  background: -webkit-linear-gradient(#18e9ea, #ec13e9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Caption = styled.span<{ dark: boolean }>`
  font-family: Inter;
  opacity: 0.9;
  font-size: 1.4rem;
  color: #1a1a1a;
  ${props => props.dark && `
    color: #f5f4f9;
  `}
`;

export const Footer1 = styled.span<{ dark: boolean }>`
  position: absolute;
  bottom: 0.7rem;
  left: 0.7rem;
  font-family: Inter;
  color: #1a1a1a;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.84;
  }
  ${props => props.dark && `
    color: #f5f4f9;
  `}
`;

export const Footer2 = styled.span<{ dark: boolean }>`
  position: absolute;
  bottom: 0.7rem;
  right: 0.7rem;
  font-family: Inter;
  color: #1a1a1a;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.84;
  }
  ${props => props.dark && `
    color: #f5f4f9;
  `}
`;
