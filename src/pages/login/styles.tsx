import styled from "styled-components";
import {BoxShadow, BoxShadowDark, FadeAnim} from "../../utils/styles";

export const Container = styled.div<{ dark: boolean }>`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f8fafc;
  ${(props) =>
    props.dark &&
    `
    background-color: #222222;
  `}
`;

export const LoginForm = styled.div<{ dark: boolean }>`
  animation: ${FadeAnim} 0.42s;
  width: 36rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 1.4rem;
  gap: 1.4rem;
  ${BoxShadow}
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
  `}
  padding-bottom: 1.2rem;
`;

export const AccountsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 14rem;
  overflow-y: auto;
  padding-right: 0.42rem;
`;

export const Account = styled.div<{ dark: boolean }>`
  animation: ${FadeAnim} 0.42s;
  display: flex;
  align-items: center;
  gap: 0.14rem;
  cursor: pointer;
  margin: 0.42rem;
  padding: 0.42rem;
  border-radius: 1.4rem;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  span {
    font-family: Inter;
    align-self: flex-start;
  }
  span:first-child {
    font-size: 1.2rem;
  }
  &:hover {
    opacity: 0.5;
  }
  ${BoxShadow}
  color: #222222;
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
    color: #ffffff;
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
  color: #222222;
  ${props => props.dark && `
  color: #ffffff;
  `}
  `;

export const Caption2 = styled.span<{ dark: boolean }>`
  font-family: Inter;
  opacity: 0.9;
  font-size: 1.2rem;
  color: #222222;
  ${(props) =>
    props.dark &&
    `
  color: #ffffff;
  `}
`;

export const Footer1 = styled.span<{ dark: boolean }>`
  position: absolute;
  bottom: 0.7rem;
  left: 0.7rem;
  font-family: Inter;
  color: #222222;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.84;
  }
  ${props => props.dark && `
    color: #ffffff;
  `}
`;

export const Footer2 = styled.span<{ dark: boolean }>`
  position: absolute;
  bottom: 0.7rem;
  right: 0.7rem;
  font-family: Inter;
  color: #222222;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.84;
  }
  ${props => props.dark && `
    color: #ffffff;
  `}
`;
