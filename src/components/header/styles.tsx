import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const Container = styled.div`
    ${BoxShadow}
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem;
    padding-top: 0.2rem;
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
`;