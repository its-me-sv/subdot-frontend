import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const InputsForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    img {
      height: 12rem;
      width: auto;
      object-fit: contain;
    }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  gap: 0.14rem;
  max-width: 24vw;
  img {
    width: 1rem;
    height: 1rem;
  }
`;

export const InputLabel = styled.span<{dark: boolean;}>`
  font-family: Inter;
  font-size: 1.2rem;
  color: #222222;
  ${props => props.dark && `
    color: #ffffff;
  `}
`;

export const Input = styled.input<{dark: boolean;}>`
  font-family: Inter;
  outline: none;
  border: none;
  font-size: 1.8rem;
  text-align: center;
  border-radius: 0.14rem;
  color: #222222;
  max-width: 14vw;
  ${BoxShadow}
  ${props => props.dark && `
    color: #ffffff;
    ${BoxShadowDark}
  `}
`;
