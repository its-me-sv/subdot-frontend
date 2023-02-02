import React from "react";

import FrndCommSection from "./section";
import {Container} from './styles';
import {friends, communities} from "../../translations/frnds-comms";

import {useAppContext} from "../../contexts/app";

const dummyIds = new Array(42).fill("<Dark Knight />");

interface FriendsCommunitiesProps {}

const FriendsCommunites: React.FC<FriendsCommunitiesProps> = () => {
    const {language} = useAppContext();

    return (
        <Container>
            <FrndCommSection title={friends[language]} ids={dummyIds} />
            <FrndCommSection title={communities[language]} ids={dummyIds} />
        </Container>
    );
};

export default FriendsCommunites;
