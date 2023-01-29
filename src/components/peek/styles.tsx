import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

export const ProfilePicture = styled.img`
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    align-self: center;
`;

export const JoinedDate = styled.span`
    font-family: Inter;
    font-size: 0.8rem;
    color: #1a1a1a;
    align-self: flex-end;
`;

export const Details = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0rem 0.42rem;
    gap: 1rem;
    margin-top: 1rem;
`;

export const Detail = styled.input`
  font-family: Inter;
  outline: none;
  border: none;
  font-size: 1.4rem;
  text-align: center;
  border-radius: 0.14rem;
  color: #1a1a1a;
  opacity: 0.9;
  padding: 0.42rem 0;
  ${BoxShadow}
`;

export const Section = styled.span`
    font-family: Inter;
    font-size: 1.2rem;
    opacity: 0.9;
    color: #1a1a1a;
`;

export const Content = styled.span`
    font-family: Inter;
    font-size: 1.6rem;
    opacity: 0.9;
    color: #1a1a1a;
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
`;
