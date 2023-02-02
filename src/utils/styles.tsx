import styled, {css} from "styled-components";

export const BoxShadow = css`
  box-shadow: rgb(0 0 0 / 70%) 1px 1px 4.2px 1px;
  background-color: #f5f4f9;
`;

export const BoxShadowDark = css`
  box-shadow: rgb(245 244 249 / 70%) 1px 1px 4.2px 1px;
  background-color: #1a1a1a;
`;

export const Button = styled.span<{bgColor: string; dark?: boolean;}>`
  font-family: Inter;
  color: #f5f4f9;
  ${BoxShadow}
  background-color: ${props => props.bgColor};
  padding: 0.42rem;
  border-radius: 0.14rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.84;
  }
  ${props => props.dark && `
    color: #1a1a1a;
  `}
`;

export const HrLn = styled.div`
  height: 1px;
  width: 100%;
  align-self: center;
  border-bottom: 1px solid #1a1a1a;
  opacity: 0.84;
`;