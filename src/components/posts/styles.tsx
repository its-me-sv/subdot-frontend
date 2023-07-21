import styled from "styled-components";
import {BoxShadow, BoxShadowDark, FadeAnim} from "../../utils/styles";

export const Container = styled.div<{dark: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 85vh;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 2.4rem;
  font-family: Inter;
  color: #222222;
  ${props => props.dark && `color: #ffffff;`}
`;

export const StickyButton = styled.div<{ abs?: boolean }>`
  align-self: flex-end;
  padding-top: 0.42rem;
  animation: ${FadeAnim} 1s;
  ${(props) => props.abs && `position: absolute;`}
`;

export const PostContainer = styled.div<{ dark: boolean }>`
  display: flex;
  flex-direction: column;
  width: 36vw;
  gap: 0.42rem;
  padding: 0.84rem;
  padding-bottom: 0.42rem;
  border-radius: 0.36rem;
  margin-bottom: 0.42rem;
  ${BoxShadow}
  ${(props) =>
    props.dark &&
    `
    ${BoxShadowDark}
  `}
`;

export const PostHeader = styled.div`
  display: flex;
  width: 36vw;
  justify-content: space-between;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  div {
    &:first-child {
      display: flex;
      gap: 0.21rem;
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
    }
  }
`;

export const PostHeaderRight = styled.div<{dark: boolean;}>`
  display: flex;
  flex-direction: column;
  font-family: Inter;
  color: #222222;
  ${props => props.dark && `
    color: #ffffff;
  `}
  img {
    width: 14vw;
    height: 2vh;
    border-radius: unset;
    margin: 0.3rem 0rem;
  }
`;

export const PostUsername = styled.span`
  font-size: 1.2rem;
`;

export const PostTime = styled.span`
  opacity: 0.9;
`;

export const PostContent = styled.span<{dark: boolean;}>`
  font-family: Inter;
  font-size: 1.2rem;
  color: #222222;
  max-height: 14rem;
  overflow-y: auto;
  ${props => props.dark && `
    color: #ffffff;
  `}
`;

export const PostImage = styled.img`
  width: 36vw;
  max-height: 49vh;
  object-fit: fill;
  border-radius: 0.14rem;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.14rem 0;
`;

export const FooterItem = styled.div<{dark: boolean;}>`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  img {
    width: 1.4rem;
    height: 1.4rem;
    ${props => props.dark && `
      filter: invert(100%);
    `}
  }
  span {
    font-family: Inter;
    font-size: 1rem;
    opacity: 0.9;
    color: #222222;
    ${props => props.dark && `
      color: #ffffff;
    `}
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const PostDescription = styled.textarea<{dark: boolean;}>`
  font-family: Inter;
  outline: none;
  border: none;
  font-size: 1.2rem;
  border-radius: 0.14rem;
  resize: none;
  color: #222222;
  ${BoxShadow}
  ${props => props.dark && `
    color: #ffffff;
    ${BoxShadowDark}
  `}
`;

export const FetchButton = styled.span<{dark: boolean;}>`
  align-self: flex-start;
  cursor: pointer;
  color: #222222;
  font-size: 0.9rem;
  ${props => props.dark && "color: #ffffff;"}
  &:hover {
    opacity: 0.5;
  }
`;
