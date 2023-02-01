import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const Container = styled.div`
  display: grid;
  grid-template-rows: 9fr 1fr;
  padding: 0.42rem 0rem;
  border-right: 1px solid #1a1a1a;
`;

export const InputContainer = styled.div`
  display: flex;
  ${BoxShadow}
  margin: 0.42rem;
  gap: 0.3rem;
  padding: 0.14rem;
  border-radius: 0.14rem;
  img {
    width: 2.1rem;
    align-self: center;
  }
    textarea,
    textarea::placeholder {
        width: 95%;
        resize: none;
        outline: none;
        border: none;
        font-family: Inter;
        border-radius: 0.14rem;
        font-size: 1.2rem;
        color: #1a1a1a;
        background-color: #d7d7d7;
    }
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  max-height: 82vh;
  overflow-y: scroll;
  margin-right: 0.14rem;
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  font-family: Inter;
  font-size: 1.2rem;
  color: #1a1a1a;
  margin-right: 0.24rem;
  background-color: #d7d7d7;
  border-radius: 0.14rem;
  padding: 0.14rem;
  max-width: 21vw;
  span:last-child {
    align-self: flex-end;
    font-size: 0.84rem;
  }
`;
