import styled from "styled-components";
import {BoxShadow, BoxShadowDark, FadeAnim} from "../../utils/styles";
import logoSmall from "../../assets/logo_small.png";

export const Container = styled.div<{dark: boolean;}>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.14rem;
    z-index: 900;
    gap: 7vw;
    ${BoxShadow}
    ${props => props.dark && `
      ${BoxShadowDark}
    `}
`;

export const HomeLogo = styled.img.attrs({
  alt: "home",
  src: logoSmall,
})`
  height: 2.8rem;
  width: auto;
  cursor: pointer;
  animation: ${FadeAnim} 1s;
  &:hover {
    opacity: 0.8;
  }
`;

export const MenuLogo = styled.img`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
  animation: ${FadeAnim} 1s;
`;

export const Footer = styled.div<{ dark: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  span {
    font-family: Inter;
    animation: ${FadeAnim} 1s;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  color: #222222;
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
  `}
`;

export const SettingsLogo = styled.img<{ dark: boolean }>`
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.42rem;
  cursor: pointer;
  ${(props) =>
    props.dark &&
    `
      filter: invert(100%);
    `}
`;
