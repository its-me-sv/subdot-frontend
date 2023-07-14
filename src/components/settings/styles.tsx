import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const SelectLang = styled.select<{ dark: boolean }>`
  border-radius: 0.36rem;
  z-index: 998;
  font-size: 1.4rem;
  font-family: Inter;
  text-align: center;
  cursor: pointer;
  opacity: 0.84;
  outline: none;
  border: none;
  width: 8rem;
  color: #222222;
  ${BoxShadow}
  ${(props) =>
    props.dark &&
    `
      ${BoxShadowDark}
      color: #ffffff;
  `}
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 14rem;
`;

export const ItemTitle = styled.span<{ dark: boolean }>`
  font-family: Inter;
  font-size: 1rem;
  color: #222222;
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
  `}
`;
