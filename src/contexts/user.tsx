import React, {createContext, useContext, ReactNode, useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";

import {User, WalletAccount} from "../utils/types";
import {useSubsocial} from "../subsocial";
import {useAppContext} from "./app";
import { REST_API } from "../utils/constants";

interface UserContextInterface {
  account: WalletAccount | null;
  user: User | null;
  reputation: number;
  followers: Array<string>;
  following: Array<string>;
  spaceId: number;
  loginUser?: (account: WalletAccount, cb: () => void) => void;
  logoutUser?: () => void;
  setAccount?: React.Dispatch<React.SetStateAction<WalletAccount | null>>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
  setReputation?: React.Dispatch<React.SetStateAction<number>>;
  setFollowers?: React.Dispatch<React.SetStateAction<Array<string>>>;
  setFollowing?: React.Dispatch<React.SetStateAction<Array<string>>>;
  setSpaceId?: React.Dispatch<React.SetStateAction<number>>;
  followUser?: (id: string) => void;
  unFollowUser?: (id: string) => void;
}

const defaultState: UserContextInterface = {
    account: null,
    user: null,
    reputation: 0,
    followers: [],
    following: [],
    spaceId: 0
};

export const UserContext = createContext<UserContextInterface>(defaultState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [account, setAccount] = useState<WalletAccount | null>(defaultState.account);
    const [user, setUser] = useState<User | null>(defaultState.user);
    const [reputation, setReputation] = useState<number>(defaultState.reputation);
    const [followers, setFollowers] = useState<Array<string>>(defaultState.followers);
    const [following, setFollowing] = useState<Array<string>>(defaultState.following);
    const [spaceId, setSpaceId] = useState<number>(defaultState.spaceId);
    const {api} = useSubsocial();
    const {setNewAccount, setLoggedIn} = useAppContext();

    const loginUser = async (acc: WalletAccount, cb: () => void) => {
        if (!api) return;
        const {address} = acc;
        setAccount(acc);
        const {presence} = (await axios.get(`${REST_API}/user/account/${address}`))
          .data;
        if (!presence) {
            setNewAccount!(acc);
            setReputation(1);
            return;
        }
        const profile = await api.base.findProfileSpace(address);
        if (!profile?.content) {
            toast.error("Error logging in");
            return;
        }
        toast.success("Logging in shortly");
        const rep = await axios.get(`${REST_API}/user/user-rp/${address}`);
        setReputation(rep.data);
        setUser(profile.content as unknown as User);
        const substrateApi = await api.substrateApi;
        const accFollowers = await substrateApi.query.accountFollows.accountFollowers(address);
        const accFollowing = await substrateApi.query.accountFollows.accountsFollowedByAccount(address);
        setFollowers(accFollowers.toArray().map(x => x.toString()));
        setFollowing(accFollowing.toArray().map(x => x.toString()));
        toast.success("Login success");
        cb();
    };

    const logoutUser = () => {
        setAccount(null);
        setUser(null);
        setLoggedIn!(false);
        setReputation(0);
        setFollowers([]);
        setFollowing([]);
        setSpaceId(0);
        toast.success("Account logout success");
    };

    const followUser = (id: string) => {
        setFollowing([...following, id]);
    };

    const unFollowUser = (id: string) => {
        setFollowing([...following.filter(v => v != id)]);
    };

    return (
        <UserContext.Provider value={{
            account, setAccount,
            user, setUser,
            loginUser,
            logoutUser,
            reputation, setReputation,
            followers, setFollowers,
            following, setFollowing,
            spaceId, setSpaceId,
            followUser, unFollowUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
