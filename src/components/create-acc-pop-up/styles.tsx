import styled from "styled-components";
import { BoxShadow, BoxShadowDark } from "../../utils/styles";

export const Box = styled.div<{ dark: boolean }>`
  font-family: Inter;
  display: flex;
  align-items: center;
  border-radius: 0.36rem;
  padding: 0.4rem 0.7rem;
  ${BoxShadow};
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
  `}
`;

export const Sides = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.42rem;
`;

export const FeaturesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.84rem;
`;

export const Feature = styled.span<{ dark: boolean }>`
  color: #222222;
  border-radius: 0.36rem;
  padding: 0.42rem;
  font-family: Inter;
  font-size: 1.2rem;
  opacity: 0.91;
  ${BoxShadow};
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
    color: #d7d7d7;
    opacity: unset;
  `}
  width: 30rem;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.84rem;
`;
