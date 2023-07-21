import styled from "styled-components";
import {BoxShadow, BoxShadowDark, FadeAnim} from "../../utils/styles";

export const Container = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  margin: 0.14rem;
  border-radius: 0.14rem;
  gap: 0.42rem;
`;

export const AdvertContainer = styled.div<{ dark: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 0.36rem;
  padding: 0.42rem;
  &:hover {
    opacity: 0.84;
  }
  span {
    text-align: center;
    font-family: Inter;
    color: #222222;
    ${(props) => props.dark && `color: #ffffff;`}
  }
  ${BoxShadow}
  ${(props) => props.dark && `${BoxShadowDark}`}
  margin: 0.42rem 0rem;
`;

export const AdvertImage = styled.img<{dark: boolean;}>`
    width: 15rem;
    height: auto;
    padding: 0.42rem;
    border-radius: 0.36rem;
    ${BoxShadow}
    ${props => props.dark && `
        ${BoxShadowDark}
    `}
`;

export const RPContainer = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0rem 1rem;
  height: 35vh;
  padding-bottom: 0.42rem;
  border-bottom: 1px solid #222222;
  ${(props) =>
    props.dark &&
    `
    border-bottom: 1px solid #ffffff;;
    `}
`;

export const RPItemsContainer = styled.div`
    height: 24vh;
`;

export const RPTitle = styled.span<{ dark: boolean }>`
  font-family: Inter;
  align-self: center;
  text-align: center;
  font-size: 1.6rem;
  opacity: 0.84;
  color: #222222;
  ${(props) =>
    props.dark &&
    `
        color: #ffffff;
    `}
`;

export const RPItem = styled.div<{ dark: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-top: 0.42rem;
  animation: ${FadeAnim} 1s;
  span {
    font-family: Inter;
    font-size: 1.4rem;
    opacity: 0.9;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    color: #222222;
    ${(props) =>
      props.dark &&
      `
            color: #ffffff;
        `}
  }
`;

export const SmallMenuContainer = styled.div<{ dark: boolean }>`
  a {
    all: unset;
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding-bottom: 1rem;
  border-radius: 0.36rem;
  padding: 0.42rem;
  ${BoxShadow}
  ${(props) => props.dark && `${BoxShadowDark}`}
`;
