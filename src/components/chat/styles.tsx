import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  height: 92vh;
  padding: 0.42rem 0rem;
  border-right: 0.3rem solid rgb(227, 224, 224);
  ${(props) =>
    props.dark &&
    `
    border-right: 0.3rem solid rgb(227, 224, 224);
  `}
`;

export const DefaultContainer = styled.div<{ dark: boolean }>`
  height: 92vh;
  padding: 0.42rem 0rem;
  color: #222222;
  font-family: Inter;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4.2rem;
  border-right: 0.3rem solid rgb(227, 224, 224);
  span {
    width: 42vw;
    text-align: justify;
    opacity: 0.7;
  }
  ${(props) =>
    props.dark &&
    `
      color: #d7d7d7;
      border-right: 0.3rem solid rgb(227, 224, 224);
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
    cursor: pointer;
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

export const MessageContainer = styled.div<{ dark: boolean; isOwner?: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  font-family: Inter;
  font-size: 1.2rem;
  margin-right: 0.24rem;
  border-radius: 0.14rem;
  padding: 0.14rem;
  max-width: 21vw;
  min-width: 7vw;
  color: #222222;
  ${BoxShadow}
  ${(props) => props.dark && `${BoxShadowDark}`}
  ${(props) =>
    props.dark &&
    `
    color: #d7d7d7;
  `}
  align-self: center;
  .footer {
    display: flex;
    align-items: center;
    align-self: flex-end;
    gap: 0.21rem;
    img {
      cursor: pointer;
      width: 0.84rem;
      height: 0.84rem;
      align-self: flex-end;
    }
    .timing {
      cursor: pointer;
      align-self: flex-end;
      font-size: 0.7rem;
    }
  }
  ${(props) => props.isOwner === "true" && `align-self: flex-end;`}
  ${(props) => props.isOwner === "false" && `align-self: flex-start;`}
`;
