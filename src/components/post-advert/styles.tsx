import styled from "styled-components";
import { BoxShadow, BoxShadowDark } from "../../utils/styles";

export const UserAdvertContainer = styled.div`
  display: flex;
  gap: 1.4rem;
`;

export const FieldInput = styled.input<{ dark: boolean }>`
  font-family: Inter;
  font-size: 1.4rem;
  padding: 0.36rem;
  border-radius: 0.36rem;
  outline: none;
  border: none;
  width: 36vw;
  max-width: 36vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #222222;
  margin-top: 0.21rem;
  ${BoxShadow}
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
    ${BoxShadowDark}
    `}
`;

export const FooterButton = styled.div`
  margin-top: 1.4rem;
  align-self: flex-end;
`;
