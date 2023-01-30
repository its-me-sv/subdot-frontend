import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const Container = styled.div`
    ${BoxShadow}
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem;
    z-index: 900;
`;

export const HomeLogo = styled.img.attrs({
  alt: "home",
  src: require("../../assets/logo_small.png"),
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

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  span {
    font-family: Inter;
    font-size: 1.2rem;
  }
`;
