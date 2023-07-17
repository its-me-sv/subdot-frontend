import styled from "styled-components";
import { BoxShadow, BoxShadowDark } from "../../utils/styles";

export const UserAdvertContainer = styled.div`
    display: flex;
    gap: 1.4rem;
`;

export const AdvertInfoItem = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  font-family: Inter;
  color: #222222;
  margin-top: 0.36rem;
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
    `}
  span {
    font-size: 1.6rem;
  }
  a {
    all: unset;
    font-size: 1.4rem;
    padding: 0.36rem;
    border-radius: 0.36rem;
    cursor: pointer;
    width: 36vw;
    max-width: 36vw;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      text-decoration: underline;
    }
    ${BoxShadow}
    ${(props) =>
      props.dark &&
      `
    color: #ffffff;
    ${BoxShadowDark}
    `}
  }
  img {
    padding: 0.36rem;
    border-radius: 0.36rem;
    width: 36vw;
    height: 2rem;
    ${BoxShadow}
    ${(props) =>
      props.dark &&
      `
    color: #ffffff;
    ${BoxShadowDark}
    `}
  }
`;
