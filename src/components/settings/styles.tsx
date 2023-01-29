import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const SelectLang = styled.select`
  border-radius: 0.14rem;
  ${BoxShadow}
  z-index: 998;
  font-size: 1.4rem;
  font-family: Inter;
  text-align: center;
  cursor: pointer;
  opacity: 0.84;
  width: 8rem;
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

export const ItemTitle = styled.span`
  font-family: Inter;
  font-size: 1rem;
`;
