import styled from "styled-components";
import {BoxShadow, BoxShadowDark, FadeAnim} from "../../utils/styles";

export const ProfilePicture = styled.img`
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    align-self: center;
`;

export const JoinedDate = styled.span<{dark: boolean;}>`
    font-family: Inter;
    font-size: 0.8rem;
    align-self: flex-end;
    color: #222222;
    ${props => props.dark && `
      color: #ffffff;
    `}
`;

export const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0rem 0.42rem;
    gap: 1rem;
    margin-top: 1rem;
    img {
      width: 14vw;
      height: 2.1rem;
    }
`;

export const Detail = styled.input<{dark: boolean;}>`
  font-family: Inter;
  outline: none;
  border: none;
  font-size: 1.4rem;
  text-align: center;
  border-radius: 0.14rem;
  opacity: 0.9;
  padding: 0.36rem;
  color: #222222;
  ${BoxShadow}
  ${props => props.dark && `
    color: #ffffff;
    ${BoxShadowDark}
  `}
`;

export const Section = styled.span<{dark: boolean;}>`
    font-family: Inter;
    font-size: 1.2rem;
    opacity: 0.9;
    color: #222222;
    ${props => props.dark && `
      color: #ffffff;
    `}
`;

export const Content = styled.span<{ dark: boolean }>`
  font-family: Inter;
  font-size: 1.6rem;
  opacity: 0.9;
  color: #222222;
  animation: ${FadeAnim} 1s;
  ${(props) =>
    props.dark &&
    `
      color: #ffffff;
    `}
`;

export const MetaDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 0.84rem;
  margin-top: 1rem;
`;

export const MetaInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1.8rem;
  margin: 1rem 0rem 0.42rem 0rem;
  animation: ${FadeAnim} 1s;
`;
