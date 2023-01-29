import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const Container = styled.div`
  position: absolute;
  background-color: #1a1a1a;
  opacity: 0.84;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  display: grid;
  place-items: center;
`;

export const Box = styled.div`
  max-width: 42rem;
  max-height: 35rem;
  font-family: Inter;
  display: flex;
  flex-direction: column;
  border-radius: 0.14rem;
  padding: 0.4rem 0.7rem;
  ${BoxShadow};
`;

export const CloseIcon = styled.span`
  cursor: pointer;
  align-self: flex-end;
`;

export const Title = styled.span`
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.4rem;
`;

export const Content = styled.span`
  margin-bottom: 1rem;
  max-height: 18rem;
  overflow-y: scroll;
`;
