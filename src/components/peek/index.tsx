import React from "react";

import {Container, Box, CloseIcon} from '../terms-privacy/styles';
import {JoinedDate, ProfilePicture, Section, Detail, Content, Details, MetaDetails, MetaInfo, Footer} from "./styles";

import {useAppContext} from "../../contexts";
import {Button} from "../../utils/styles";

interface PeekProps {
    id: string;
}

const Peek: React.FC<PeekProps> = ({id}) => {
    const {setPeek} = useAppContext();

    return (
      <Container>
        <Box>
          <CloseIcon onClick={() => setPeek!("")}>X</CloseIcon>
          <ProfilePicture
            alt={`pp of ${id}`}
            src={require("../header/temp.jpg")}
          />
          <JoinedDate>Member since May 11, 2002</JoinedDate>
          <Details>
            <Section>USERNAME</Section>
            <Detail type="text" value={"<Dark Knight />"} readOnly />
          </Details>
          <Details>
            <Section>NAME</Section>
            <Detail type="text" value={"Suraj Vijayan"} readOnly />
          </Details>
          <MetaDetails>
            <MetaInfo>
              <Content>52</Content>
              <Section>FOLLOWERS</Section>
            </MetaInfo>
            <MetaInfo>
              <Content>76</Content>
              <Section>FOLLOWING</Section>
            </MetaInfo>
            <MetaInfo>
              <Content>14</Content>
              <Section>POSTS</Section>
            </MetaInfo>
          </MetaDetails>
          <Footer>
            <Button bgColor="#0072bb">MESSAGE</Button>
            <Button bgColor="#005e20">TRANSFER $</Button>
            <Button bgColor="#353132">VIEW PROFILE</Button>
          </Footer>
        </Box>
      </Container>
    );
};

export default Peek;
