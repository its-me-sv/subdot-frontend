import React from "react";
import { useUserContext } from "../../contexts/user";

import FrndCommSection from "./section";
import {Container} from './styles';

interface FriendsCommunitiesProps {}

const FriendsCommunites: React.FC<FriendsCommunitiesProps> = () => {
    const {followers, following} = useUserContext();

    return (
        <Container>
            <FrndCommSection title="FOLLOWERS" ids={followers} />
            <FrndCommSection title="FOLLOWING" ids={following} />
        </Container>
    );
};

export default FriendsCommunites;
