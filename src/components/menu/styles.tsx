import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div<{dark: boolean;}>`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    top: 0px;
    right: 0px;
    gap: 0.42rem;
    padding: 0.2rem 0.2rem 0.42rem 1rem;
    border-bottom-left-radius: 0.42rem;
    z-index: 998;
    ${BoxShadow}
    ${props => props.dark && `
      ${BoxShadowDark}
    `}
`;

export const MenuItem = styled.span<{dark: boolean;}>`
  font-family: Inter;
  font-size: 1.4rem;
  opacity: 0.9;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
    text-decoration: underline;
  }
  color: #222222;
  ${props => props.dark && `
    color: #ffffff;
  `}
`;
