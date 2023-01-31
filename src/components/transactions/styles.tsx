import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const TransactionsHolder = styled.div`
    display: flex;
    flex-direction: column;
    width: 21rem;
    max-height: 30rem;
    gap: 0.42rem;
    overflow-y: scroll;
    padding: 0.14rem 0.14rem;
    margin-bottom: 0.42rem;
`;

export const TransactionContainer = styled.div`
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
    }
`;

export const Meta = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-family: Inter;
    color: #1a1a1a;
  }
  span:first-child {
    font-size: 1.2rem;
  }
`;

export const Amount = styled.span`
    font-family: Inter;
    font-size: 1.2rem;
    color: #1a1a1a;
`;
