import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  overflow-y: auto;
  padding: 1rem;
  padding-bottom: 2.4rem;
`;

export const StickyButton = styled.div<{ abs?: boolean }>`
  align-self: flex-end;
  padding-top: 0.42rem;
  ${(props) => props.abs && `position: absolute;`}
`;

export const PostContainer = styled.div<{dark: boolean;}>`
  display: flex;
  flex-direction: column;
  width: 36vw;
  gap: 0.42rem;
  padding: 0.42rem;
  padding-bottom: 0.14rem;
  border-radius: 0.14rem;
  margin-bottom: 1.2rem;
  ${BoxShadow}
  ${props => props.dark && `
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
  color: #1a1a1a;
  ${props => props.dark && `
    color: #f5f4f9;
  `}
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
  color: #1a1a1a;
  max-height: 14rem;
  overflow-y: auto;
  ${props => props.dark && `
    color: #f5f4f9;
  `}
`;

export const PostImage = styled.img`
  width: 36vw;
  border-radius: 0.14rem;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FooterItem = styled.div<{dark: boolean;}>`
  display: flex;
  align-items: center;
  gap: 0.14rem;
  cursor: pointer;
  img {
    width: 2.1rem;
    height: 2.1rem;
    ${props => props.dark && `
      filter: invert(100%);
    `}
  }
  span {
    font-family: Inter;
    font-size: 1.2rem;
    opacity: 0.9;
    color: #1a1a1a;
    ${props => props.dark && `
      color: #f5f4f9;
    `}
  }
  &:hover {
    opacity: 0.5;
  }
`;

export const PostDescription = styled.textarea<{dark: boolean;}>`
  font-family: Inter;
  outline: none;
  border: none;
  font-size: 1.2rem;
  border-radius: 0.14rem;
  resize: none;
  color: #1a1a1a;
  ${BoxShadow}
  ${props => props.dark && `
    color: #f5f4f9;
    ${BoxShadowDark}
  `}
`;

export const FetchButton = styled.span<{dark: boolean;}>`
  align-self: flex-start;
  cursor: pointer;
  color: #1a1a1a;
  font-size: 0.9rem;
  ${props => props.dark && "color: #f5f4f9;"}
  &:hover {
    opacity: 0.5;
  }
`;
