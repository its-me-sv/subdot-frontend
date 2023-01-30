import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const Container = styled.div`
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
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
  border-radius: 0.14rem;
  cursor: pointer;
  ${BoxShadow}
`;
