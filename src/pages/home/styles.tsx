import styled from "styled-components";

export const Container = styled.div<{ dark: boolean }>`
  display: grid;
  grid-template-columns: 2fr 8fr 3fr;
  grid-template-rows: 1fr;
  background-color: #f8fafc;
  ${props => props.dark && `
    background-color: #222222;
  `}
`;
