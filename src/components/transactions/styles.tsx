import styled from "styled-components";
import {BoxShadow, BoxShadowDark, FadeAnim} from "../../utils/styles";

export const TransactionsHolder = styled.div<{dark: boolean;}>`
    display: flex;
    flex-direction: column;
    /* width: 21rem; */
    max-height: 30rem;
    gap: 0.42rem;
    overflow-y: auto;
    padding: 0.14rem 0.14rem;
    margin-bottom: 0.42rem;
    font-family: Inter;
    color: #222222;
    ${props => props.dark && `color: #ffffff;`}
`;

export const TransactionContainer = styled.div<{ dark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.14rem;
  padding: 0.14rem;
  padding-right: 0.42rem;
  width: 36rem;
  animation: ${FadeAnim} 1s;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    &:hover {
      opacity: 0.5;
    }
  }
  &:hover {
    ${BoxShadow}
    ${(props) => props.dark && `${BoxShadowDark}`}
  }
`;

export const Meta = styled.div<{dark: boolean;}>`
  display: flex;
  flex-direction: column;
  span {
    font-family: Inter;
    color: #222222;
    ${props => props.dark && `
      color: #ffffff;
    `}
  }
  span:first-child {
    font-size: 1.2rem;
  }
  span:last-child {
    cursor: pointer;
  }
`;

export const Amount = styled.span<{ dark: boolean; kind: string }>`
  font-family: Inter;
  font-size: 1.2rem;
  color: #222222;
  ${(props) =>
    props.dark &&
    `
      color: #ffffff;
    `}
  ${(props) => !(props.kind === "false") && `color: #138000`}
`;
