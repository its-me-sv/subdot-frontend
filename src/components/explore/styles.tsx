import styled from "styled-components";
import {BoxShadow, BoxShadowDark, FadeAnim} from "../../utils/styles";
import searchIcon from "../../assets/icons/search.png";

export const Container = styled.div<{ dark: boolean }>`
  padding: 0.3rem 0.6rem;
  display: flex;
  gap: 0.42rem;
  border-radius: 14rem;
  animation: ${FadeAnim} 1s;
  ${BoxShadow}
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
  `}
`;

export const SearchIcon = styled.img.attrs({
    alt: "search",
    src: searchIcon
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
  background-color: #ffffff;
  color: #222222;
  ${(props) =>
    props.dark &&
    `
    background-color: #222222;
    color: #ffffff;
  `}
`;
