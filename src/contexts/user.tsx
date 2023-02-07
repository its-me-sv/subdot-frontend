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
  loginUser?: (account: WalletAccount, cb: () => void) => void;
  setAccount?: React.Dispatch<React.SetStateAction<WalletAccount | null>>;
  setUser?: React.Dispatch<React.SetStateAction<User | null>>;
}

const defaultState: UserContextInterface = {
    account: null,
    user: null
};

export const UserContext = createContext<UserContextInterface>(defaultState);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [account, setAccount] = useState<WalletAccount | null>(defaultState.account);
    const [user, setUser] = useState<User | null>(defaultState.user);
    const {api} = useSubsocial();
    const {setNewAccount} = useAppContext();

    const loginUser = async (account: WalletAccount, cb: () => void) => {
        if (!api) return;
        const {address} = account;
        const {presence} = (await axios.get(`${REST_API}/user/account/${address}`))
          .data;
        if (!presence) {
            setNewAccount!(account);
            return;
        }
        const profile = await api.base.findProfileSpace(address);
        if (profile?.content) {
            console.log(profile.content);
            setUser(profile.content as unknown as User);
            toast.success("Login success");
            cb();
        }
    };

    return (
        <UserContext.Provider value={{
            account, setAccount,
            user, setUser,
            loginUser
        }}>
            {children}
        </UserContext.Provider>
    );
};
