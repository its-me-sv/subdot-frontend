import styled from "styled-components";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Inter;
  font-size: 2.1rem;
  color: #222222;
  background-color: #ffffff;
  ${(props) =>
    props.dark &&
    `
        background-color: #222222;
        color: #ffffff;
    `}
`;
