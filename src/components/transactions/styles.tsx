import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const TransactionsHolder = styled.div`
    display: flex;
    flex-direction: column;
    width: 21rem;
    max-height: 30rem;
    gap: 0.42rem;
    overflow-y: auto;
    padding: 0.14rem 0.14rem;
    margin-bottom: 0.42rem;
`;

export const TransactionContainer = styled.div<{dark: boolean;}>`
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
    cursor: pointer;
    border-radius: 0.14rem;
    padding: 0.14rem;
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

export const Amount = styled.span<{dark: boolean;}>`
    font-family: Inter;
    font-size: 1.2rem;
    color: #1a1a1a;
    ${props => props.dark && `
      color: #f5f4f9;
    `}
`;
