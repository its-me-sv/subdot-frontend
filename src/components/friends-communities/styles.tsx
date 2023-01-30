import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const Container = styled.div`
    display: grid;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.14rem;
  border-radius: 0.14rem;
  padding: 0rem 0.42rem;
  padding-bottom: 0.42rem;
  margin-right: 0rem;
  margin-bottom: 0rem;
`;

export const SectionTitle = styled.span`
    font-family: Inter;
    font-size: 1.6rem;
    opacity: 0.84;
    color: #1a1a1a;
`;

export const SectionProfiles = styled.div`
  display: flex;
  flex-direction: column;
  height: 40vh;
  padding-top: 0.42rem;
  gap: 0.42rem;
  overflow-y: scroll;
`;

export const ProfileContainer = styled.div`
  cursor: pointer;
  margin: 0 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.21rem;
  padding: 0.21rem;
  &:hover {
    border-radius: 0.14rem;
    ${BoxShadow}
  }
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
`;

export const ProfileName = styled.span`
  font-family: Inter;
  font-size: 1.2rem;
  color: #1a1a1a;
`;

export const ProfileStatusText = styled.span`
  font-family: Inter;
  font-size: 1rem;
  color: #1a1a1a;
`;
