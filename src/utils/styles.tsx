import styled, {css, keyframes} from "styled-components";

export const BoxShadow = css`
  box-shadow: 0 0 20px #e2e8f0;
  background-color: #ffffff;
`;

export const BoxShadowDark = css`
  box-shadow: 0 0 20px #595959;
  background-color: #222222;
`;

export const Button = styled.span<{bgColor: string; dark?: boolean; fixed?: boolean}>`
  font-family: Inter;
  color: #ffffff;
  ${BoxShadow}
  background-color: ${props => props.bgColor};
  padding: 0.42rem;
  border-radius: 0.36rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.84;
  }
  ${props => props.dark && `
    color: #222222;
  `}
  ${props => props.fixed && `
    position: absolute;
  `}
`;

export const HrLn = styled.div`
  height: 1px;
  width: 100%;
  align-self: center;
  border-bottom: 1px solid #222222;
  opacity: 0.84;
`;

export const FadeAnim = keyframes`
  0% {opacity: 0;}
  100% {opacity: 0.6;}
`;
