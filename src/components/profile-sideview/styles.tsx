import styled from "styled-components";
import { BoxShadow, BoxShadowDark } from "../../utils/styles";

export const Container = styled.div<{dark: boolean;}>`
  display: flex;
  flex-direction: column;
  padding: 0 0.42rem;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  font-family: Inter;
  img {
    width: 8.4rem;
    height: 8.4rem;
    border-radius: 50%;
  }
  color: #1a1a1a;
  ${props => props.dark && `color: #f5f4f9;`}
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
  color: #1a1a1a; */
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
    color: #1a1a1a;
    ${props => props.dark && `color: #f5f4f9;`}
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
