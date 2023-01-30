import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 0.42rem;
    align-items: center;
    justify-content: center;
    gap: 1.4rem;
    img {
        width: 8.4rem;
        height: 8.4rem;
        border-radius: 50%;
    }
`;

export const Username = styled.span`
  font-family: Inter;
  font-size: 1.6rem;
  text-align: center;
  color: #1a1a1a;
`;

export const Joined = styled.span`
  font-family: Inter;
  color: #1a1a1a;
`;

export const Status = styled.span`
    font-family: Inter;
    font-size: 1.2rem;
    text-align: center;
    color: #1a1a1a;
`;

export const Meta = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

export const MetaItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-family: Inter;
    color: #1a1a1a;
    font-size: 1.2rem;
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
