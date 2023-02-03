import styled from "styled-components";
import {BoxShadow, BoxShadowDark} from "../../utils/styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.4rem;
  height: 90vh;
  overflow-y: scroll;
  padding: 1rem;
`;

export const StickyButton = styled.div`
    align-self: flex-end;
    padding-top: 0.42rem;
    position: absolute;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 36vw;
  gap: 0.42rem;
  padding: 0.42rem;
  border-radius: 0.14rem;
  ${BoxShadow}
`;

export const PostHeader = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 0.21rem;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

export const PostHeaderRight = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PostUsername = styled.span`
  font-family: Inter;
  font-size: 1.2rem;
  color: #1a1a1a;
`;

export const PostTime = styled.span`
  font-family: Inter;
  color: #1a1a1a;
  opacity: 0.9;
`;

export const PostContent = styled.span`
  font-family: Inter;
  font-size: 1.2rem;
  color: #1a1a1a;
`;

export const PostImage = styled.img`
  width: 36vw;
  border-radius: 0.14rem;
`;

export const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FooterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.14rem;
  cursor: pointer;
  img {
    width: 2.1rem;
    height: 2.1rem;
  }
  span {
    font-family: Inter;
    color: #1a1a1a;
    font-size: 1.2rem;
    opacity: 0.9;
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
