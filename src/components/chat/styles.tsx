import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div<{dark: boolean;}>`
  display: flex;
  flex-direction: column;
  height: 92vh;
  padding: 0.42rem 0rem;
  border-right: 1px solid #222222;
  ${props => props.dark && `
    border-right: 1px solid #ffffff;
  `}
`;

export const InputContainer = styled.div<{ dark: boolean }>`
  display: flex;
  margin: 0.42rem;
  gap: 0.3rem;
  padding: 0.14rem;
  border-radius: 0.14rem;
  img {
    width: 2.1rem;
    align-self: center;
    ${(props) => props.dark && `filter: invert(100%);`}
  }
  ${BoxShadow}
  ${(props) => props.dark && `${BoxShadowDark}`}
  textarea,
  textarea::placeholder {
    width: 95%;
    resize: none;
    outline: none;
    border: none;
    font-family: Inter;
    border-radius: 0.14rem;
    font-size: 1.2rem;
    color: #222222;
    background-color: #d7d7d7;
    ${(props) =>
      props.dark &&
      `
    background-color: #625e5e;
    color: #d7d7d7;
  `}
  }
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  height: 84vh;
  overflow-y: auto;
  margin-right: 0.14rem;
  margin-top: 0.42rem;
  padding-left: 0.84rem;
`;

export const Message = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  font-family: Inter;
  font-size: 1.2rem;
  margin-right: 0.24rem;
  border-radius: 0.14rem;
  padding: 0.14rem;
  max-width: 21vw;
  span:last-child {
    align-self: flex-end;
    font-size: 0.84rem;
  }
  color: #222222;
  background-color: #d7d7d7;
  ${(props) =>
    props.dark &&
    `
    background-color: #625e5e;
    color: #d7d7d7;
  `}
`;
