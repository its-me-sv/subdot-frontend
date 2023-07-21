import styled from "styled-components";
import {BoxShadow, BoxShadowDark, FadeAnim} from "../../utils/styles";

export const Container = styled.div<{ dark: boolean }>`
  display: flex;
  background-color: #f8fafc;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  gap: 1rem;
  ${(props) =>
    props.dark &&
    `
    background-color: #222222;
  `}
`;

export const InfoBox = styled.div<{ dark: boolean; frmPrf?: boolean; frmUsr?: boolean;}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.42rem;
  border-radius: 0.36rem;
  padding: 1rem;
  ${(props) => !props.frmPrf && `${BoxShadow}`}
  ${(props) => (props.dark && !props.frmPrf) && `${BoxShadowDark}`}
  ${(props) => props.frmUsr && `
    padding: 0.36rem;
    justify-content: space-between;
    opacity: 0.84;
  `}
`;

export const InfoBoxTitle = styled.span<{ dark: boolean }>`
  font-family: Inter;
  font-size: 1.4rem;
  color: #222222;
  animation: ${FadeAnim} 1s;
  ${(props) =>
    props.dark &&
    `
    color: #ffffff;
  `}
`;

export const InfoContent = styled.span`
    display: flex;
    flex-direction: column;
    gap: 0.14rem;
`;

export const InfoItem = styled.div<{ dark: boolean }>`
  display: flex;
  justify-content: space-between;
  gap: 0.42rem;
  width: 14rem;
  span {
    animation: ${FadeAnim} 1s;
    font-family: Inter;
    font-size: 1.2rem;
    color: #222222;
    ${(props) =>
      props.dark &&
      `
            color: #ffffff;
        `}
  }
`;

export const BoardContainer = styled.div`
    display: grid;
    gap: 1.2rem;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    max-height: 88vh;
    overflow-y: auto;
    padding: 1rem;
`;

export const UserContainer = styled.div<{ dark: boolean }>`
  border-radius: 0.36rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  padding: 0.36rem;
  cursor: pointer;
  animation: ${FadeAnim} 1s;
  font-family: Inter;
  width: 15vw;
  ${BoxShadow}
  ${(props) => props.dark && `${BoxShadowDark}`}
  color: #222222;
  ${(props) => props.dark && `color: #ffffff;`}
  &:hover {
    opacity: 0.5;
  }
`;

export const FetchButton = styled.div`
  margin: 0.42rem 0rem;
  align-self: center;
`;

export const UserHeader = styled.div`
  display: flex;
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
  gap: 0.42rem;
  align-items: center;
`;

export const UserHeaderRight = styled.div`
  display: flex;
  flex-direction: column;
`;
