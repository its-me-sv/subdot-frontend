import React from "react";

import FrndCommSection from "./section";
import {Container} from './styles';

const dummyIds = new Array(42).fill("<Dark Knight />");

interface FriendsCommunitiesProps {}

const FriendsCommunites: React.FC<FriendsCommunitiesProps> = () => {
    return (
        <Container>
            <FrndCommSection title="FRIENDS" ids={dummyIds} />
            <FrndCommSection title="COMMUNITIES" ids={dummyIds} />
        </Container>
    );
};

export default FriendsCommunites;
