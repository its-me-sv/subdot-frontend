import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div`
  padding: 0.5rem;
  display: grid;
  margin: 0.14rem;
  border-radius: 0.14rem;
`;

export const AdvertContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        opacity: 0.84;
    }
`;

export const AdvertImage = styled.img<{dark: boolean;}>`
    width: 16rem;
    height: 21rem;
    padding: 0.42rem;
    border-radius: 0.21rem;
    ${BoxShadow}
    ${props => props.dark && `
        ${BoxShadowDark}
    `}
`;

export const RPContainer = styled.div<{dark: boolean;}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0rem 1rem;
  padding-bottom: 0.42rem;
  border-bottom: 1px solid #1a1a1a;
  ${(props) =>
    props.dark &&
    `
    border-bottom: 1px solid #f5f4f9;;
    `}
`;

export const RPTitle = styled.span<{dark: boolean;}>`
    font-family: Inter;
    align-self: center;
    text-align: center;
    font-size: 1.6rem;
    opacity: 0.84;
    color: #1a1a1a;
    ${props => props.dark && `
        color: #f5f4f9;
    `}
`;

export const RPItem = styled.div<{dark: boolean;}>`
    display: flex;
    justify-content: space-between;
    margin-top: 0.42rem;
    span {
        font-family: Inter;
        font-size: 1.4rem;
        opacity: 0.9;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
        color: #1a1a1a;
        ${props => props.dark && `
            color: #f5f4f9;
        `}
    }
`;
