import React, {useEffect, useState} from "react";
import {encodeAddress} from "@polkadot/util-crypto";

import FrndCommSection from "./section";
import {Container} from './styles';
import {
    followers as FOLLOWERS, 
    following as FOLLOWING
} from "../../translations/frnds-comms";

import { useAppContext } from "../../contexts/app";
import { useUserContext } from "../../contexts/user";
import { useSubsocial } from "../../subsocial";

interface FriendsCommunitiesProps {
    accountId: string | undefined;
}

const FriendsCommunites: React.FC<FriendsCommunitiesProps> = ({
    accountId
}) => {
    const {dark, language} = useAppContext();
    const {api} = useSubsocial();
    const {
        account, 
        followers: currFollowers, 
        following: currFollowing
    } = useUserContext();
    const [followers, setFollowers] = useState<Array<string>>([]);
    const [following, setFollowing] = useState<Array<string>>([]);

    const fetchData = async () => {
        if (!accountId || !account?.address || !api) return;
        if (account.address === accountId) {
            setFollowers(currFollowers);
            setFollowing(currFollowing);
            return;
        }
        const substrateApi = await api.substrateApi;
        const followers = await substrateApi.query.accountFollows.accountFollowers(accountId);
        const following = await substrateApi.query.accountFollows.accountsFollowedByAccount(accountId); 
        setFollowers(followers.toArray().map((x) => encodeAddress(x, 42)));
        setFollowing(following.toArray().map((x) => encodeAddress(x, 42)));
    };

    useEffect(() => {
        fetchData();
    }, [api, accountId]);

    return (
        <Container dark={dark}>
            <FrndCommSection title={FOLLOWERS[language]} ids={followers} />
            <FrndCommSection title={FOLLOWING[language]} ids={following} />
        </Container>
    );
};

export default FriendsCommunites;
