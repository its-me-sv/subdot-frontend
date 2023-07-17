import styled from "styled-components";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  background-color: #f8fafc;
  ${(props) =>
    props.dark &&
    `
    background-color: #222222;
  `}
`;
