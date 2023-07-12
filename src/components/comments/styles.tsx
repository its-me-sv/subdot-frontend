import styled from "styled-components";
import { BoxShadow, BoxShadowDark, FadeAnim } from "../../utils/styles";

export const CommentsHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  height: 30vh;
  overflow-y: auto;
  margin: 0.42rem 0;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.14rem;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
  animation: ${FadeAnim} 1s;
  align-items: flex-start;
`;

export const CommentHolder = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  width: 36vw;
  border-radius: 0.14rem;
  padding: 0.14rem 0.21rem;
  background-color: #d7d7d7;
  color: #222222;
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
    font-size: 0.8rem;
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
  width: 36vw;
  textarea,
  textarea::placeholder {
    resize: none;
    outline: none;
    border: none;
    font-family: Inter;
    border-radius: 0.14rem;
    font-size: 1.2rem;
    color: #222222;
    background-color: #d7d7d7;
    ${(props) =>
      props.dark &&
      `
      background-color: #625e5e;
      color: #d7d7d7;
    `}
  }
`;

export const CommentMeta = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  img {
    border-radius: unset;
    width: 7vw;
    height: 2vh;
  }
  span:first-child {
    font-size: 1rem;
    font-family: Inter;
    font-weight: bold;
    opacity: 0.7;
  }
`;

export const Box = styled.div<{ dark: boolean }>`
  width: 36vw;
  font-family: Inter;
  display: flex;
  flex-direction: column;
  gap: 0.42rem;
  padding: 0.84rem;
  padding-bottom: 0.42rem;
  border-radius: 1.4rem;
  ${BoxShadow};
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
  `}
`;

export const PostImage = styled.img`
  width: 36vw;
  max-height: 49vh;
  object-fit: fill;
  border-radius: 0.14rem;
`;
