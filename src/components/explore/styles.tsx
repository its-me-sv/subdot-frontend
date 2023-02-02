import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div<{dark: boolean;}>`
  padding: 0.3rem 0.6rem;
  display: flex;
  gap: 0.42rem;
  border-radius: 14rem;
  ${BoxShadow}
  ${props => props.dark && `
    ${BoxShadowDark}
  `}
`;

export const SearchIcon = styled.img.attrs({
    alt: "search",
    src: require("../../assets/icons/search.png")
})<{dark: boolean;}>`
  height: 1.8rem;
  width: auto;
  ${props => props.dark && `
    filter: invert(100%);
  `}
`;

export const Input = styled.input<{ dark: boolean }>`
  outline: none;
  border: none;
  text-align: center;
  font-family: Inter;
  font-size: 1.4rem;
  width: 30vw;
  background-color: #f5f4f9;
  color: #1a1a1a;
  ${(props) =>
    props.dark &&
    `
    background-color: #1a1a1a;
    color: #f5f4f9;
  `}
`;
