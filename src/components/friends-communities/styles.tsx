import styled from "styled-components";
import {BoxShadow, BoxShadowDark, FadeAnim} from "../../utils/styles";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  margin: 0.14rem;
  margin-bottom: 0rem;
  gap: 0.42rem;
`;

export const Section = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 0.36rem;
  padding: 0.42rem;
  ${BoxShadow}
  ${(props) => props.dark && `${BoxShadowDark}`}
`;

export const SectionTitle = styled.span<{ dark: boolean }>`
  font-family: Inter;
  font-size: 1.6rem;
  opacity: 0.84;
  color: #222222;
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
  `}
`;

export const SectionProfiles = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  height: 38vh;
  padding-top: 0.42rem;
  gap: 0.42rem;
  overflow-y: auto;
  span {
    font-family: Inter;
    color: #222222;
    ${props => props.dark && `color #ffffff;`}
  }
`;

export const ProfileContainer = styled.div<{ hover?: boolean; dark: boolean }>`
  cursor: pointer;
  margin: 0 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.21rem;
  padding: 0.14rem;
  animation: ${FadeAnim} 1s;
  &:hover {
    border-radius: 0.14rem;
    ${BoxShadow}
    ${(props) => props.dark && `${BoxShadowDark}`}
  }
  ${(props) =>
    props?.hover &&
    `
    border-radius: 0.14rem;
    ${BoxShadow}
    ${props.dark && `${BoxShadowDark}`}
  `}
`;

export const ProfileDetails = styled.div`
  display: flex;
  gap: 0.21rem;
`;

export const ProfilePicture = styled.img`
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
`;

export const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    img {
      margin-bottom: 0.5rem;
      width: 5rem;
      height: 1rem;
      &:last-child {
        width: 11rem
      }
    }
`;

export const ProfileName = styled.span<{dark: boolean;}>`
  font-family: Inter;
  font-size: 1.2rem;
  color: #222222;
  ${props => props.dark && `
    color: #ffffff;
  `}
`;

export const ProfileStatusText = styled.span<{ dark: boolean; hover?: boolean }>`
  font-family: Inter;
  font-size: 1rem;
  color: #222222;
  white-space: nowrap;
  overflow: hidden;
  max-width: 11rem;
  text-overflow: ellipsis;
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
  `}
  ${(props) =>
    props?.hover &&
    `
      max-width: unset;
  `}
`;
