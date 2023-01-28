import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const Container = styled.div`
  position: absolute;
  z-index: 999;
  background-color: black;
  opacity: 0.7;
  width: 100vw;
  height: 92vh;
  display: flex;
  flex-direction: column;
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

export const Item = styled.span`
  font-family: Inter;
  font-size: 1.8rem;
  padding: 0.7rem;
  border-radius: 0.42rem;
  cursor: pointer;
  ${BoxShadow}
`;
