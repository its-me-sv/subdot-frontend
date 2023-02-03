import styled from "styled-components";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: 2.1rem;
  color: #1a1a1a;
  background-color: #f5f4f9;
  ${(props) =>
    props.dark &&
    `
        background-color: #1a1a1a;
        color: #f5f4f9;
    `}
`;
