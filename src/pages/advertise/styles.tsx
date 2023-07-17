import styled from "styled-components";

export const Container = styled.div<{dark: boolean}>`
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AdvertStatsContainer = styled.div<{ dark: boolean }>`
    display: flex;
    flex-direction: column;
`;

export const FetchButton = styled.span<{ dark: boolean }>`
  align-self: flex-end;
  cursor: pointer;
  color: #222222;
  font-size: 0.9rem;
  ${(props) => props.dark && "color: #ffffff;"}
  &:hover {
    opacity: 0.5;
  }
`;

export const StatsContainer = styled.div`
    display: flex;
`;

export const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Inter;
    align-items: center;
    text-align: center;
`;

export const Seperator = styled.div``;
