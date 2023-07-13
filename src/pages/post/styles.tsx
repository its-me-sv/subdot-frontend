import styled from "styled-components";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 93vh;
  background-color: #f8fafc;
  ${(props) =>
    props.dark &&
    `
        background-color: #2b2a2a;
    `}
`;