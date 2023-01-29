import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const Container = styled.div`
    ${BoxShadow}
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: 0px;
    right: 0px;
    gap: 0.42rem;
    padding: 0.2rem 0.2rem 0.42rem 1rem;
    border-bottom-left-radius: 0.42rem;
    z-index: 998;
`;

export const MenuItem = styled.span`
  font-family: Inter;
  font-size: 1.4rem;
  color: #1a1a1a;
  opacity: 0.9;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    text-decoration: underline;
  }
`;
