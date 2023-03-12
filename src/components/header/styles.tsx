import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";
import logoSmall from "../../assets/logo_small.png";

export const Container = styled.div<{dark: boolean;}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem;
    z-index: 900;
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
`;

export const Footer = styled.div<{ dark: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  span {
    font-family: Inter;
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
