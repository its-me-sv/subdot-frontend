import styled from "styled-components";
import { BoxShadow } from "../../utils/styles";

export const Container = styled.div`
    padding: 0.5rem 0.25rem 0.5rem 0.5rem;
    display: grid;
`;

export const Section = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SectionTitle = styled.span`
    font-family: Inter;
    font-size: 1.4rem;
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
