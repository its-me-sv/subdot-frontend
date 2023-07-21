import styled from "styled-components";
import { BoxShadow, BoxShadowDark } from "../../utils/styles";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  max-height: 89vh;
  overflow-y: auto;
  font-family: Inter;
  border-radius: 0.36rem;
  padding: 0.5rem;
  padding-bottom: 0rem;
  margin: 0.5rem;
  img {
    width: 14vw;
    height: 3vh;
    &:first-child {
      width: 8.4rem;
      height: 8.4rem;
      border-radius: 50%;
    }
  }
  color: #222222;
  ${BoxShadow}
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
    ${BoxShadowDark}
  `}
`;

export const Username = styled.span`
  font-size: 1.6rem;
  text-align: center;
`;

export const Name = styled.span`
  font-size: 1.4rem;
  text-align: center;
`;

export const Joined = styled.span`
  /* font-family: Inter;
  color: #222222; */
`;

export const Status = styled.span`
    font-size: 1.2rem;
    text-align: center;
`;

export const Meta = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

export const MetaItem = styled.div<{dark: boolean;}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-family: Inter;
    font-size: 1.2rem;
    color: #222222;
    ${props => props.dark && `color: #ffffff;`}
  }
  span:first-child {
    font-size: 1.6rem;
  }
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
`;

export const ProfileEditContainer = styled.div<{dark: boolean}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.42rem;
  gap: 0.42rem;
  height: 70%;
  width: 21%;
  position: fixed;
  z-index: 800;
  input {
    max-width: 60%;
  }
  ${BoxShadow}
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
  `}
`;
