import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr;
`;

export const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.42rem;
    margin: 0rem 0.42rem;
`;

export const InfoBoxTitle = styled.span`
  font-family: Inter;
  font-size: 1.4rem;
  color: #1a1a1a;
`;

export const InfoContent = styled.span`
    display: flex;
    flex-direction: column;
    gap: 0.14rem;
`;

export const InfoItem = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.42rem;
    span {
        font-family: Inter;
        font-size: 1.2rem;
        color: #1a1a1a;
    }
`;
