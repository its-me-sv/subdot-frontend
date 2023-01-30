import React from "react";
import {useNavigate} from "react-router-dom";

import {Button} from "../../utils/styles";
import {
    Container, Footer, 
    Joined, Status, 
    Meta, MetaItem,
    Username
} from "./styles";

import {useAppContext} from "../../contexts/app";

interface ProfileSideViewProps {
    id: string;
}

const ProfileSideView: React.FC<ProfileSideViewProps> = ({id}) => {
  const navigate = useNavigate();
  const {setTransferId} = useAppContext();

  return (
    <Container>
      <img alt="pp" src={require("../../assets/temp.jpg")} />
      <Username>{"<Dark Knight />"}</Username>
      <Joined>Member since May 11, 2002</Joined>
      <Status>The night is darkest just before the dawn</Status>
      <Meta>
        <MetaItem>
          <span>173</span>
          <span>REPUTATION</span>
        </MetaItem>
        <MetaItem>
          <span>14</span>
          <span>POSTS</span>
        </MetaItem>
        <MetaItem>
          <span>52</span>
          <span>FOLLOWERS</span>
        </MetaItem>
        <MetaItem>
          <span>76</span>
          <span>FOLLOWING</span>
        </MetaItem>
      </Meta>
      <Footer>
        <Button bgColor="#0072bb" onClick={() => navigate(`/chat?user=${id}`)}>
          MESSAGE
        </Button>
        <Button bgColor="#005e20" onClick={() => setTransferId!(id)}>
          TRANSFER $
        </Button>
        <Button bgColor="#1a1a1a">FOLLOW</Button>
      </Footer>
    </Container>
  );
};

export default ProfileSideView;
