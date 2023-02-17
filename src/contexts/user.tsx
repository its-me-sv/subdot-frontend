import React, {createContext, useContext, ReactNode, useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {encodeAddress} from "@polkadot/util-crypto";

import {User, WalletAccount} from "../utils/types";
import {useSubsocial} from "../subsocial";
import {useAppContext} from "./app";
import { BALANCE_DIVISOR, REST_API } from "../utils/constants";
import { getSigner, getTxEventIds } from "../subsocial/polkadot";

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
  followUser?: (id: string, cb: () => void) => void;
  unFollowUser?: (id: string, cb: () => void) => void;
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
    const {setNewAccount, setLoggedIn, setLowBalance, setOverlap} = useAppContext();

    const loginUser = async (acc: WalletAccount, cb: () => void) => {
        if (!api) return;
        const {address} = acc;
        setAccount(acc);
        const {presence} = (await axios.get(`${REST_API}/user/account/${address}`))
          .data;
        const profile = await api.base.findProfileSpace(address);
        if (!presence) {
          setNewAccount!(acc);
          setReputation(1);
          if (profile?.content || profile) {
            setOverlap!(true);
          }
          return;
        }
        const loginPromise = new Promise(async (resolve, reject) => {
            if (!profile?.content) {
                toast.error("Error logging in");
                return reject();
            }
            setSpaceId(+profile.struct.id.toString());
            const rep = await axios.get(`${REST_API}/user/user-rp/${address}`);
            setReputation(rep.data);
            setUser(profile.content as unknown as User);
            const substrateApi = await api.substrateApi;
            const accFollowers = await substrateApi.query.accountFollows.accountFollowers(address);
            const accFollowing = await substrateApi.query.accountFollows.accountsFollowedByAccount(address);
            setFollowers(accFollowers.toArray().map(x => encodeAddress(x, 42)));
            setFollowing(accFollowing.toArray().map(x => encodeAddress(x, 42)));
            cb();
            return resolve(true);
        });
        toast.promise(loginPromise, {
            loading: "Fetching account details",
            success: "Login success",
            error: "Unable to log in"
        });
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

    const followUser = (id: string, cb: () => void) => {
        if (!api || !account) return;
        const followPromise = new Promise(async (resolve, reject) => {
            try {
                const substrateApi = await api.blockchain.api;
                const followTx = substrateApi.tx.accountFollows.followAccount(id);
                const signer = await getSigner(account.address);
                if (!signer) return reject();
                await followTx.signAsync(account.address, { signer });
                getTxEventIds(followTx);
                const {partialFee} = await followTx.paymentInfo(account.address);
                axios.post(`${REST_API}/transaction/new`, {
                  accountId: account.address,
                  desc: "Followed a user",
                  kind: false,
                  amount: +(
                    partialFee.toNumber() / BALANCE_DIVISOR
                  ).toPrecision(3),
                });
                toast.success("Account has been follwed");
                axios.put(`${REST_API}/user/incr-rp/${id}/1`);
                resolve(true);
            } catch (err) {
                if ((err = "INSUFFICIENT BALANCE")) {
                  toast.error(
                    "Your account has insufficient funds to complete this transaction"
                  );
                  setLowBalance!(true);
                }
                return reject();
            }
        });
        toast.promise(followPromise, {
            loading: "Following user",
            success: "User followed",
            error: "Couldn't follow user"
        });
        followPromise.then(() => {
            setFollowing([...following, id]);
            cb();
        });
    };

    const unFollowUser = (id: string, cb: () => void) => {
        if (!api || !account) return;
        const unFollowPromise = new Promise(async (resolve, reject) => {
          try {
            const substrateApi = await api.blockchain.api;
            const followTx = substrateApi.tx.accountFollows.unfollowAccount(id);
            const signer = await getSigner(account.address);
            if (!signer) return reject();
            await followTx.signAsync(account.address, { signer });
            getTxEventIds(followTx);
            const {partialFee} = await followTx.paymentInfo(account.address);
            axios.post(`${REST_API}/transaction/new`, {
              accountId: account.address,
              desc: "Unfollowed a user",
              kind: false,
              amount: +(partialFee.toNumber() / BALANCE_DIVISOR).toPrecision(3),
            });
            toast.success("Account has been unfollwed");
            resolve(true);
          } catch (err) {
            if ((err = "INSUFFICIENT BALANCE")) {
              toast.error(
                "Your account has insufficient funds to complete this transaction"
              );
              setLowBalance!(true);
            }
            return reject();
          }
        });
        toast.promise(unFollowPromise, {
          loading: "Unfollowing user",
          success: "User unfollowed",
          error: "Couldn't unfollow user",
        });
        unFollowPromise.then(() => {
          setFollowing([...following.filter((v) => v != id)]);
          cb();
        });
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
