import React from "react";
import {useNavigate} from "react-router-dom";

import {Container, Box, CloseIcon} from '../terms-privacy/styles';
import {JoinedDate, ProfilePicture, Section, Detail, Content, Details, MetaDetails, MetaInfo, Footer} from "./styles";

import {useAppContext} from "../../contexts/app";
import {Button} from "../../utils/styles";

interface PeekProps {
    id: string;
}

const Peek: React.FC<PeekProps> = ({id}) => {
    const navigate = useNavigate();
    const {setPeek, setTransferId} = useAppContext();

    return (
      <Container>
        <Box>
          <CloseIcon onClick={() => setPeek!("")}>X</CloseIcon>
          <ProfilePicture
            alt={`pp of ${id}`}
            src={require("../../assets/temp.jpg")}
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
              <Content>42</Content>
              <Section>RP</Section>
            </MetaInfo>
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
            <Button 
              bgColor="#0072bb" 
              onClick={() => navigate(`/chat?user=${id}`)}
            >MESSAGE</Button>
            <Button 
              bgColor="#005e20"
              onClick={() => setTransferId!(id)}
            >TRANSFER $</Button>
            <Button 
              bgColor="#353132"
              onClick={() => navigate(`/profile/${id}`)}
            >VIEW PROFILE</Button>
          </Footer>
        </Box>
      </Container>
    );
};

export default Peek;
