import styled from "styled-components";

import {BoxShadow} from "../../utils/styles";

export const Container = styled.div`
  ${BoxShadow}
  padding: 0.3rem 0.6rem;
  display: flex;
  gap: 0.42rem;
  border-radius: 14rem;
`;

export const SearchIcon = styled.img.attrs({
    alt: "search",
    src: require("../../assets/icons/search.png")
})`
    height: 1.8rem;
    width: auto;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  text-align: center;
  font-family: Inter;
  font-size: 1.4rem;
  background-color: #f5f4f9;
  color: #1a1a1a;
  width: 30vw;
`;
