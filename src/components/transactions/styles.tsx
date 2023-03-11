import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

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
    color: #1a1a1a;
    ${props => props.dark && `color: #f5f4f9;`}
`;

export const TransactionContainer = styled.div<{dark: boolean;}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.14rem;
    padding: 0.14rem;
    width: 36rem;
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
      ${props => props.dark && `${BoxShadowDark}`}
    }
`;

export const Meta = styled.div<{dark: boolean;}>`
  display: flex;
  flex-direction: column;
  span {
    font-family: Inter;
    color: #1a1a1a;
    ${props => props.dark && `
      color: #f5f4f9;
    `}
  }
  span:first-child {
    font-size: 1.2rem;
  }
`;

export const Amount = styled.span<{ kind: boolean }>`
  font-family: Inter;
  font-size: 1.2rem;
  color: #d0421b;
  ${(props) => props.kind && `color: #138000`}
`;
