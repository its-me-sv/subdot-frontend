import styled from "styled-components";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  background-color: #f8fafc;
  margin-left: auto;
  margin-right: auto;
  ${props => props.dark && `
    background-color: #222222;
  `}
`;
