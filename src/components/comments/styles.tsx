import styled from "styled-components";

export const CommentsHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  height: 30rem;
  overflow-y: scroll;
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

export const CommentHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 35rem;
  margin-right: 0.24rem;
  background-color: #d7d7d7;
  border-radius: 0.14rem;
  padding: 0.14rem;
`;

export const CommentTime = styled.span`
    font-family: Inter;
    align-self: flex-end;
`;

export const CommentText = styled.span`
    font-family: Inter;
    font-size: 1.2rem;
    color: #1a1a1a;
`;

export const CommentFooter = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 0.42rem;
  align-items: center;
  border-radius: 0.14rem;
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
  }
`;