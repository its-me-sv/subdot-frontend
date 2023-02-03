import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const InputsForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const InputLabel = styled.span<{dark: boolean;}>`
  font-family: Inter;
  font-size: 1.2rem;
  color: #1a1a1a;
  ${props => props.dark && `
    color: #f5f4f9;
  `}
`;

export const Input = styled.input<{dark: boolean;}>`
  font-family: Inter;
  outline: none;
  border: none;
  font-size: 1.8rem;
  text-align: center;
  border-radius: 0.14rem;
  color: #1a1a1a;
  ${BoxShadow}
  ${props => props.dark && `
    color: #f5f4f9;
    ${BoxShadowDark}
  `}
`;
