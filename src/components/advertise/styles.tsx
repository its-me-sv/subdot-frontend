import styled from "styled-components";
import {BoxShadow} from "../../utils/styles";

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

export const InputLabel = styled.span`
  font-family: Inter;
  font-size: 1.2rem;
`;

export const Input = styled.input`
  font-family: Inter;
  outline: none;
  border: none;
  font-size: 1.2rem;
  text-align: center;
  border-radius: 0.14rem;
  ${BoxShadow}
`;
