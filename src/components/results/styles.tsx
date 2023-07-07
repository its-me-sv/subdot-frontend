import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div<{dark: boolean;}>`
  position: absolute;
  z-index: 999;
  width: 100vw;
  display: flex;
  height: 92%;
  margin-top: 3.5rem;
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
  overflow-y: auto;
  overflow-x: hidden;
  gap: 0.7rem;
  padding: 1rem 14rem;
`;

export const Item = styled.span<{dark: boolean;}>`
  font-family: Inter;
  font-size: 1.2rem;
  padding: 0.7rem;
  border-radius: 1.4rem;
  cursor: pointer;
  color: #222222;
  display: flex;
  align-items: center;
  gap: 0.14rem;
  div {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  ${BoxShadow}
  ${props => props.dark && `
    ${BoxShadowDark}
    color: #ffffff;
  `}
`;
