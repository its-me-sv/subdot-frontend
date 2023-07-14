import styled from "styled-components";
import { BoxShadow, BoxShadowDark } from "../../utils/styles";

export const Box = styled.div<{ dark: boolean }>`
  font-family: Inter;
  display: flex;
  align-items: center;
  border-radius: 0.36rem;
  padding: 0.4rem 0.7rem;
  padding-bottom: 1.4rem;
  gap: 1rem;
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
  height: 24rem;
  .title {
    font-size: 1.4rem;
  }
`;

export const FeaturesContainer = styled.div<{ isLeft?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.84rem;
  max-height: 24rem;
  overflow-y: auto;
  padding: 1rem;
  irection: ltr;
  ${(props) =>
    props.isLeft &&
    `
  direction: rtl;
  `}
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
  direction: ltr;
`;

export const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 0.84rem;
  height: 24rem;
  /* border-right: 0.3rem solid rgb(227, 224, 224);
  border-left: 0.3rem solid rgb(227, 224, 224); */
  padding: 0rem 0.84rem;
  padding-bottom: 1.4rem;
`;
