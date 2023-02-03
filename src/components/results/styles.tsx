import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div<{dark: boolean;}>`
  z-index: 999;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  ${props => props.dark && `
    background-color: rgba(255, 255, 255, 0.5);
  `}
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
  gap: 0.7rem;
  padding: 1rem 14rem;
`;

export const Item = styled.span<{dark: boolean;}>`
  font-family: Inter;
  font-size: 1.8rem;
  padding: 0.7rem;
  border-radius: 0.14rem;
  cursor: pointer;
  color: #1a1a1a;
  ${BoxShadow}
  ${props => props.dark && `
    ${BoxShadowDark}
    color: #f5f4f9;
  `}
`;
