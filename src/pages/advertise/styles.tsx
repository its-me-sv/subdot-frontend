import styled from "styled-components";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  font-family: Inter;
  background-color: #f8fafc;
  ${(props) =>
    props.dark &&
    `
    background-color: #222222;
  `}
`;
