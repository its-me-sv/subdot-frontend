import styled from "styled-components";
import { BoxShadow, BoxShadowDark } from "../../utils/styles";

export const AdvertStatsContainer = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 0.36rem;
  width: 70vw;
  padding: 0.42rem 0.36rem;
  ${BoxShadow}
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
  `}
`;

export const StatHeader = styled.div<{ dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #222222;
  padding-left: 0.42rem;
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
  `}
  span:first-child {
    font-size: 1.6rem;
  }
`;

export const FetchButton = styled.span<{ dark: boolean }>`
  align-self: flex-start;
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
  gap: 0.42rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.84rem 2.1rem;
  padding-bottom: 0.42rem;
`;

export const StatItem = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  font-family: Inter;
  align-items: center;
  text-align: center;
  color: #222222;
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
  `}
  span:first-child {
    font-size: 1.4rem;
  }
  span:last-child {
    font-size: 1.2rem;
    cursor: pointer;
  }
`;

export const Seperator = styled.div`
  border-right: 0.2rem solid rgb(227, 224, 224);
  border-radius: 0.36rem;
  height: 2.1rem;
`;