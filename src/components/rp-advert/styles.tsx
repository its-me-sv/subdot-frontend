import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const AdvertContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        opacity: 0.84;
    }
`;

export const AdvertImage = styled.img`
    width: 16rem;
    height: 21rem;
    padding: 0.42rem;
    border-radius: 0.21rem;
    ${BoxShadow}
`;

export const RPContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0rem 1rem;
    padding-bottom: 0.42rem;
    border-bottom: 1px solid #1a1a1a;
`;

export const RPTitle = styled.span`
    font-family: Inter;
    align-self: center;
    font-color: #1a1a1a;
    font-size: 1.4rem;
    opacity: 0.84;
`;

export const RPItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 0.42rem;
    span {
        font-family: Inter;
        font-size: 1.4rem;
        color: #1a1a1a;
        opacity: 0.9;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
    }
`;
