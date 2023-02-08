import React from "react";

import FrndCommSection from "./section";
import {Container} from './styles';

import { useAppContext } from "../../contexts/app";
import { useUserContext } from "../../contexts/user";

interface FriendsCommunitiesProps {}

const FriendsCommunites: React.FC<FriendsCommunitiesProps> = () => {
    const {followers, following} = useUserContext();
    const {dark} = useAppContext();

    return (
        <Container dark={dark}>
            <FrndCommSection title="FOLLOWERS" ids={followers} />
            <FrndCommSection title="FOLLOWING" ids={following} />
        </Container>
    );
};

export default FriendsCommunites;
