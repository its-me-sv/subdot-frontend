import styled from "styled-components";

export const CommentsHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  height: 30rem;
  overflow-y: auto;
  margin-bottom: 0.42rem;
`;

export const CommentContainer = styled.div`
    display: flex;
    gap: 0.14rem;
    img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
            opacity: 0.5;
        }
    }
    align-items: flex-start;
`;

export const CommentHolder = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  width: 42rem;
  margin-right: 0.24rem;
  border-radius: 0.14rem;
  padding: 0.14rem;
  background-color: #d7d7d7;
  color: #1a1a1a;
  ${(props) =>
    props.dark &&
    `
    background-color: #625e5e;
    color: #d7d7d7;
  `}
`;

export const CommentTime = styled.span`
    font-family: Inter;
    align-self: flex-end;
`;

export const CommentText = styled.span`
    font-family: Inter;
    font-size: 1.2rem;
`;

export const CommentFooter = styled.div<{ dark: boolean }>`
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 0.42rem;
  align-items: center;
  border-radius: 0.14rem;
  width: 42rem;
  textarea,
  textarea::placeholder {
    resize: none;
    outline: none;
    border: none;
    font-family: Inter;
    border-radius: 0.14rem;
    font-size: 1.2rem;
    color: #1a1a1a;
    background-color: #d7d7d7;
    ${(props) =>
      props.dark &&
      `
      background-color: #625e5e;
      color: #d7d7d7;
    `}
  }
`;
